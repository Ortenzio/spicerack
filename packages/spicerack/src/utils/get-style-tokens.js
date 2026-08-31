import { TOKENS } from '@/constants/tokens';

export function getStyleTokens (tokenOptions) {
  return ({ ...TOKENS, ...tokenOptions });
}
