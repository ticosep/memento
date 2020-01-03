export function getScore(gameData) {
   const { gapCorreto, gapSelecionado } = gameData;
   
   if (gapCorreto === gapSelecionado) return 1;

   return 0;
}