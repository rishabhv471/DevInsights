interface Environment {
  production: boolean;
  productHuntToken: string;
  deepseekApiKey: string;
  huggingfaceApiKey: string;
  togetherApiKey: string;
  replicateApiKey: string;
}               

export const environment: Environment = {
  production: false, 
  productHuntToken: 'PvjxxLvcK8qKXtzdpCOLKgCUBOhybj-8sK3sItmhh_U', //expired
  deepseekApiKey: 'sk-e18ae956595b4bc0b87067a9086aa2e3', //expired
  huggingfaceApiKey: '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', //expired
  togetherApiKey: 'qwer', //expired
  replicateApiKey: 'r8_2ZxTxAAxaap0AkBOhB1UhkJQcyCdOWc2vM104' //expired
};
