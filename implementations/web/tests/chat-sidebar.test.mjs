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
