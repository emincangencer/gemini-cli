/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { vi, describe, it, expect, beforeEach } from 'vitest';
import { modelCommand } from './modelCommand.js';
import { type CommandContext } from './types.js';
import { createMockCommandContext } from '../../test-utils/mockCommandContext.js';
import { Config } from '@google/gemini-cli-core';

describe('modelCommand', () => {
  let mockContext: CommandContext;
  let mockSetModel: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockSetModel = vi.fn();
    vi.clearAllMocks();

    mockContext = createMockCommandContext({
      services: {
        config: {
          setModel: mockSetModel,
        } as unknown as Config,
      },
    });
  });

  it("should switch to gemini-2.0-pro when passed 'pro'", async () => {
    if (!modelCommand.action) {
      throw new Error('modelCommand must have an action.');
    }

    const result = await modelCommand.action(mockContext, 'pro');

    expect(mockSetModel).toHaveBeenCalledWith('gemini-2.0-pro');
    expect(result).toEqual({
      type: 'message',
      messageType: 'info',
      content: 'Switched to model: gemini-2.0-pro',
    });
  });

  it("should switch to gemini-1.5-flash when passed 'flash'", async () => {
    if (!modelCommand.action) {
      throw new Error('modelCommand must have an action.');
    }

    const result = await modelCommand.action(mockContext, 'flash');

    expect(mockSetModel).toHaveBeenCalledWith('gemini-1.5-flash');
    expect(result).toEqual({
      type: 'message',
      messageType: 'info',
      content: 'Switched to model: gemini-1.5-flash',
    });
  });

  it('should return an error for an invalid model', async () => {
    if (!modelCommand.action) {
      throw new Error('modelCommand must have an action.');
    }

    const result = await modelCommand.action(mockContext, 'invalid-model');

    expect(mockSetModel).not.toHaveBeenCalled();
    expect(result).toEqual({
      type: 'message',
      messageType: 'error',
      content: "Invalid model. Please use 'pro' or 'flash'.",
    });
  });
});
