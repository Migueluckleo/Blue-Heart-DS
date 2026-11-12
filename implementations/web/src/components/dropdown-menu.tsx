'use client';

import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { DropdownItem, type DropdownEntry, type DropdownOption, type DropdownSize } from './dropdown-item';
import { InputTrigger } from './input';

interface DropdownGroup {
  heading?: Extract<DropdownEntry,{type:'header'}>;
  entries: Exclude<DropdownEntry,{type:'header'}>[];
}

const optionId=(menuId: string, id: string)=>`${menuId}-option-${encodeURIComponent(id)}`;

function partition(entries: readonly DropdownEntry[]) {
  const groups: DropdownGroup[]=[{entries:[]}];
  for(const entry of entries){
    if(entry.type==='header') groups.push({heading:entry,entries:[]});
    else groups.at(-1)?.entries.push(entry);
  }
  return groups.filter(group=>group.heading||group.entries.length);
}

export interface DropdownMenuProps {
  id: string;
  label: string;
  entries: readonly DropdownEntry[];
  size?: DropdownSize;
  selectedId?: string;
  activeId?: string;
  onSelectionChange: (id: string) => void;
  maxHeight?: number;
  hidden?: boolean;
}

export function DropdownMenu({id,label,entries,size='medium',selectedId,activeId,onSelectionChange,maxHeight,hidden}: DropdownMenuProps) {
  const viewport=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const container=viewport.current;
    const option=activeId ? document.getElementById(optionId(id,activeId)) : null;
    if(hidden||!container||!option)return;
    const bounds=container.getBoundingClientRect();
    const item=option.getBoundingClientRect();
    if(item.top<bounds.top+container.clientTop)container.scrollTop+=item.top-bounds.top-container.clientTop;
    else if(item.bottom>bounds.top+container.clientTop+container.clientHeight){
      container.scrollTop+=item.bottom-bounds.top-container.clientTop-container.clientHeight;
    }
  },[activeId,hidden,id]);

  return <div ref={viewport} id={id} role="listbox" aria-label={label} hidden={hidden}
    className="bh-dropdown-menu" data-blueheart="dropdown-menu"
    style={{'--bh-dropdown-max':maxHeight===undefined?undefined:`${maxHeight}px`} as CSSProperties}>
    {partition(entries).map(({heading,entries:rows})=>{
      const headingId=heading?`${id}-group-${encodeURIComponent(heading.id)}`:undefined;
      return <div key={heading?.id??'ungrouped'} role={heading?'group':'presentation'} aria-labelledby={headingId}>
        {heading&&<DropdownItem entry={heading} size={size} id={headingId}/>}
        {rows.map(entry=><DropdownItem key={entry.id} entry={entry} size={size} id={optionId(id,entry.id)}
          selected={entry.id===selectedId} active={entry.id===activeId}
          onMouseDown={event=>event.preventDefault()} onActivate={()=>onSelectionChange(entry.id)}/>)}
      </div>;
    })}
  </div>;
}

export interface DropdownFieldProps extends Omit<DropdownMenuProps,'id'|'activeId'|'hidden'> {
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function DropdownField({label,entries,size='medium',selectedId,onSelectionChange,maxHeight,
  placeholder='Selecciona una opción',disabled,className}: DropdownFieldProps) {
  const id=useId();
  const menuId=`${id}-menu`;
  const container=useRef<HTMLDivElement>(null);
  const [open,setOpen]=useState(false);
  const [activeId,setActiveId]=useState<string>();
  const options=entries.filter((entry): entry is DropdownOption=>entry.type==='option'&&!entry.disabled);
  const selected=entries.find((entry): entry is DropdownOption=>entry.type==='option'&&entry.id===selectedId);
  const active=options.find(entry=>entry.id===activeId);
  const expanded=open&&!disabled&&options.length>0;
  useEffect(()=>{
    if(!expanded)return;
    const onPointerDown=(event: PointerEvent)=>{
      if(event.target instanceof Node&&!container.current?.contains(event.target))setOpen(false);
    };
    document.addEventListener('pointerdown',onPointerDown);
    return ()=>document.removeEventListener('pointerdown',onPointerDown);
  },[expanded]);

  function show(last=false){
    if(!options.length)return;
    setActiveId(options.find(entry=>entry.id===selectedId)?.id??(last?options.at(-1)?.id:options[0]?.id));
    setOpen(true);
  }
  function choose(value: string){
    if(!options.some(entry=>entry.id===value))return;
    onSelectionChange(value);
    setOpen(false);
  }
  function handleKey(event: KeyboardEvent<HTMLButtonElement>){
    switch(event.key){
      case 'ArrowDown':
      case 'ArrowUp': {
        event.preventDefault();
        const backward=event.key==='ArrowUp';
        if(!expanded){show(backward);return;}
        const index=options.findIndex(entry=>entry.id===active?.id);
        const next=index<0?(backward?options.length-1:0):Math.min(options.length-1,Math.max(0,index+(backward?-1:1)));
        setActiveId(options[next]?.id);
        return;
      }
      case 'Home':
      case 'End':
        if(expanded){event.preventDefault();setActiveId(event.key==='Home'?options[0]?.id:options.at(-1)?.id);}
        return;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if(!expanded)show();
        else if(active)choose(active.id);
        return;
      case 'Escape':
        if(expanded){event.preventDefault();setOpen(false);}
        return;
      case 'Tab':
        setOpen(false);
    }
  }

  return <div ref={container} className={['bh-dropdown-field',className].filter(Boolean).join(' ')}
    onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget))setOpen(false);}}>
    <InputTrigger id={id} label={label} placeholder={placeholder} value={selected?.label} size={size} role="combobox"
      disabled={disabled||options.length===0} aria-expanded={expanded} aria-controls={menuId}
      aria-haspopup="listbox" aria-activedescendant={expanded&&active?optionId(menuId,active.id):undefined}
      onKeyDown={handleKey} onClick={()=>expanded?setOpen(false):show()}/>
    <DropdownMenu id={menuId} label={label} entries={entries} size={size} selectedId={selectedId}
      activeId={active?.id} onSelectionChange={choose} maxHeight={maxHeight} hidden={!expanded}/>
  </div>;
}
