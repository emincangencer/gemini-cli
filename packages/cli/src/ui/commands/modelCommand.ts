/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommandKind, SlashCommand } from './types.js';

const MODEL_MAP = {
  pro: 'gemini-2.5-pro',
  flash: 'gemini-2.5-flash',
};

type ModelAlias = keyof typeof MODEL_MAP;

export const modelCommand: SlashCommand = {
  name: 'model',
  description: 'Switch the current model. Usage: /model [pro|flash]',
  kind: CommandKind.BUILT_IN,
  action: async (context, args) => {
    const modelAlias = args as ModelAlias;
    const fullModelName = MODEL_MAP[modelAlias];

    if (!fullModelName) {
      return {
        type: 'message',
        messageType: 'error',
        content: `Invalid model. Please use 'pro' or 'flash'.`,
      };
    }

    context.services.config?.setModel(fullModelName);
    return {
      type: 'message',
      messageType: 'info',
      content: `Switched to model: ${fullModelName}`,
    };
  },
};
