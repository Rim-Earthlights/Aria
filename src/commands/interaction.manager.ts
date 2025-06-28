import { CacheType, ChatInputCommandInteraction } from 'discord.js';
import { InteractionHandler } from './interaction.handler';
import { Logger } from '../common/logger';
import { LogLevel } from '../type/log.type';
import { PingHandler } from './handlers/ping.handler';

/**
 * スラッシュコマンドのマネージャー
 */
export class InteractionManager {
  private readonly logger = new Logger();
  private interaction: ChatInputCommandInteraction<CacheType>;
  private handlers: Map<string, InteractionHandler> = new Map();

  constructor(interaction: ChatInputCommandInteraction<CacheType>) {
    this.interaction = interaction;
    this.handlers.set('ping', new PingHandler(this.logger));
  }

  /**
   * 各スラッシュコマンドのハンドラーを実行
   * @returns
   */
  async handle() {
    await this.logger.info(
      'interaction-received',
      [
        `cid: ${this.interaction.channel?.id}`,
        `author: ${this.interaction.user.displayName}`,
        `content: ${this.interaction}`,
      ],
      this.interaction.guild?.id,
      this.interaction.channel?.id,
      this.interaction.user.id
    );

    const handler = this.handlers.get(this.interaction.commandName);
    if (!handler) {
      await this.logger.error(
        'interaction-handler-not-found',
        [`Command: ${this.interaction.commandName}`],
        this.interaction.guild?.id,
        this.interaction.channel?.id,
        this.interaction.user.id
      );
      await this.interaction.reply({
        content: 'コマンドが見つかりませんでした。',
        ephemeral: true,
      });
      return;
    }
    await handler.execute(this.interaction);
  }
}
