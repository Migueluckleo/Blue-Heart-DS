'use client';
import * as Examples from '../examples';
import * as Example_characters from '../examples/characters';
import * as Example_chat from '../examples/chat';
import * as Example_chat_history_item from '../examples/chat-history-item';
import * as Example_chat_plan_usage from '../examples/chat-plan-usage';
import * as Example_chat_sidebar from '../examples/chat-sidebar';
import * as Example_chat_sidebar_section from '../examples/chat-sidebar-section';
import * as Example_chat_tool_item from '../examples/chat-tool-item';
import * as Example_conversation_composer from '../examples/conversation-composer';
import * as Example_conversation_response from '../examples/conversation-response';
import * as Example_user_message from '../examples/user-message';
import type { ComponentType } from 'react';
export const examples: Record<string, ComponentType> = {
  "app-shell": Examples.AppShellExample,
  "avatar": Examples.AvatarExample,
  "avatar-group": Examples.AvatarGroupExample,
  "badge": Examples.BadgeExample,
  "breadcrumb": Examples.BreadcrumbExample,
  "breadcrumb-item": Examples.BreadcrumbItemExample,
  "buttons": Examples.ButtonsExample,
  "characters": Example_characters.CharactersExample,
  "chat": Example_chat.ChatExample,
  "chat-history-item": Example_chat_history_item.ChatHistoryItemExample,
  "chat-plan-usage": Example_chat_plan_usage.ChatPlanUsageExample,
  "chat-sidebar": Example_chat_sidebar.ChatSidebarExample,
  "chat-sidebar-section": Example_chat_sidebar_section.ChatSidebarSectionExample,
  "chat-tool-item": Example_chat_tool_item.ChatToolItemExample,
  "checkbox": Examples.CheckboxExample,
  "chip": Examples.ChipExample,
  "company-selector": Examples.CompanySelectorExample,
  "conversation-composer": Example_conversation_composer.ConversationComposerExample,
  "conversation-response": Example_conversation_response.ConversationResponseExample,
  "dot": Examples.DotExample,
  "dropdown-item": Examples.DropdownItemExample,
  "dropdown-menu": Examples.DropdownMenuExample,
  "file-upload": Examples.FileUploadExample,
  "floating-actions": Examples.FloatingActionsExample,
  "header": Examples.HeaderExample,
  "header-actions": Examples.HeaderActionsExample,
  "icon-button": Examples.IconButtonExample,
  "inline-notification": Examples.InlineNotificationExample,
  "input": Examples.InputExample,
  "linear-progress": Examples.LinearProgressExample,
  "loader": Examples.LoaderExample,
  "menu-item": Examples.MenuItemExample,
  "pagination": Examples.PaginationExample,
  "pagination-item": Examples.PaginationItemExample,
  "radio": Examples.RadioExample,
  "radio-group": Examples.RadioGroupExample,
  "search": Examples.SearchExample,
  "section-header": Examples.SectionHeaderExample,
  "sidebar": Examples.SidebarExample,
  "stepper": Examples.StepperExample,
  "tab": Examples.TabExample,
  "table": Examples.TableExample,
  "table-cell": Examples.TableCellExample,
  "tabs": Examples.TabsExample,
  "text-area": Examples.TextAreaExample,
  "toggle": Examples.ToggleExample,
  "tooltip": Examples.TooltipExample,
  "top-bar": Examples.TopBarExample,
  "user-message": Example_user_message.UserMessageExample,
  "user-selector": Examples.UserSelectorExample,
};
