import assert from 'node:assert/strict';
import test from 'node:test';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {ChatsIcon} from '@phosphor-icons/react/dist/csr/Chats';
import {ChatRailItem} from '../src/components/chat-rail-item.tsx';
import {ChatSidebar} from '../src/components/chat-sidebar.tsx';

test('Rail Content can use host items or stay empty and keeps the plan outside', () => {
  const props = {mode: 'rail', view: 'none', onViewChange: () => {}, plan: {plan: 'Pro', used: 1, limit: 10}};
  const nav = markup => markup.match(/<nav[^>]* data-slot="content">([\s\S]*?)<\/nav>/)?.[1];
  const custom = ['Indicador local', 'Chats del equipo'].map(label => createElement(ChatRailItem, {
    key: label, label, icon: ChatsIcon, onActivate: () => {},
  }));
  const fallback = renderToStaticMarkup(createElement(ChatSidebar, props));
  assert.equal(nav(fallback).match(/data-blueheart="chat-rail-item"/g).length, 4);
  const changed = renderToStaticMarkup(createElement(ChatSidebar, props, custom));
  assert.match(nav(changed), /aria-label="Indicador local"[\s\S]*aria-label="Chats del equipo"/);
  assert.equal(nav(changed).match(/data-blueheart="chat-rail-item"/g).length, 2);
  const empty = renderToStaticMarkup(createElement(ChatSidebar, props, null));
  assert.equal(nav(empty), '');
  for (const markup of [fallback, changed, empty]) {
    assert.match(markup, /<\/nav><div[^>]*role="meter"/);
  }
});

test('V1 uses one history disclosure and places the expanded plan outside Content', () => {
  const props = {version: 'v1', view: 'Chats', onViewChange: () => {}, onCollapse: () => {},
    onSearch: () => {}, plan: {plan: 'Pro', used: 41, limit: 150}};
  const rail = renderToStaticMarkup(createElement(ChatSidebar, {...props, mode: 'rail'}));
  assert.match(rail, /data-version="v1" data-mode="rail"/);
  assert.match(rail, /aria-expanded="false"[^>]*aria-label="Abrir historial de chats"/);
  assert.doesNotMatch(rail, /role="meter"|data-blueheart="chat-rail-item"/);
  const panel = renderToStaticMarkup(createElement(ChatSidebar, {...props, title: 'Historial del equipo'}, 'Conversación'));
  assert.match(panel, /data-version="v1" data-mode="panel"/);
  assert.match(panel, /aria-label="Cerrar historial de chats"[\s\S]*<h2>Historial del equipo<\/h2>[\s\S]*aria-label="Buscar chats"/);
  assert.match(panel, /data-slot="content">Conversación<\/div>[\s\S]*role="meter"[^>]*aria-valuenow="41"/);
});
