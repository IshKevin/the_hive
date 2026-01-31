export const gameState = {
  maskPieces: 0,
  totalPieces: 4,
  environments: ['savannah', 'swamp', 'forest', 'mountain'],
  currentEnvIndex: 0,
  // Sound settings
  soundEnabled: true,
  // Track which mask pieces have been collected
  collectedMasks: {
    mask1: false,  // Savannah piece
    mask2: false,  // Swamp piece
    mask3: false,  // Forest piece
    mask4: false   // Mountain piece
  },
  // Toggle sound on/off
  toggleSound() {
    this.soundEnabled = !this.soundEnabled
    return this.soundEnabled
  },
  // Reset collected masks
  resetMasks() {
    this.maskPieces = 0
    this.collectedMasks = {
      mask1: false,
      mask2: false,
      mask3: false,
      mask4: false
    }
  }
}
