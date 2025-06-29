export const mockDatabase = {
  jogadores: [
    { id: 1, nome: 'Gabigol', time: 'Flamengo', posicao: 'Atacante', gols: 150, assistencias: 40 },
    { id: 2, nome: 'Renato Augusto', time: 'Corinthians', posicao: 'Meio-campo', gols: 50, assistencias: 70 },
    { id: 3, nome: 'Endrick', time: 'Palmeiras', posicao: 'Atacante', gols: 20, assistencias: 5 },
  ],
  times: [
    { id: 1, nome: 'Flamengo', tecnico: 'Tite', estadio: 'Maracanã', titulos: 8 },
    { id: 2, nome: 'Corinthians', tecnico: 'António Oliveira', estadio: 'Neo Química Arena', titulos: 7 },
    { id: 3, nome: 'Palmeiras', tecnico: 'Abel Ferreira', estadio: 'Allianz Parque', titulos: 12 },
  ],
  competicoes: [
      { id: 1, nome: 'Brasileirão Série A', pais: 'Brasil', times: 20, atualCampeao: 'Palmeiras' },
      { id: 2, nome: 'Copa Libertadores', pais: 'América do Sul', times: 32, atualCampeao: 'Fluminense' },
  ]
};