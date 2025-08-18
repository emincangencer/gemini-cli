/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type { CommandModule, Argv } from 'yargs';
import { type CommandContext } from '../ui/commands/types.js';

// Define the supported models
const MODEL_MAP = {
  pro: 'gemini-2.0-pro',
  flash: 'gemini-2.5-flash',
};

type ModelAlias = keyof typeof MODEL_MAP;

export const modelCommand: CommandModule<object, { model: ModelAlias }> = {
  command: 'model <model>',
  describe: 'Switch the current model',
  builder: (yargs: Argv<object>) =>
    yargs.positional('model', {
      describe: 'The model to switch to',
      type: 'string',
      choices: Object.keys(MODEL_MAP),
    }) as Argv<{ model: ModelAlias }>,
  handler: async (args) => {
    const { model } = args;
    const fullModelName = MODEL_MAP[model];

    // This is a placeholder for where the logic to update the config would go.
    // As we discovered, the config object is not directly available here.
    // We will need to use the CommandContext to get access to the config.
    console.log(`Switching to model: ${fullModelName}`);
  },
};

export async function model(context: CommandContext, model: string) {
  const fullModelName = MODEL_MAP[model as ModelAlias];
  if (!fullModelName) {
    // TODO: Show an error to the user
    return;
  }
  context.services.config?.setModel(fullModelName);
}
