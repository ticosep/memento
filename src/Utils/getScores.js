export function getScore(gameData) {
   const { gapCerto , gapSelecionado} = gameData;

   if(gapCerto === gapSelecionado) return 1;

   return 0;
}