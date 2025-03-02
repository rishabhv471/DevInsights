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
  productHuntToken: 'Your Product Hunt Token',
  deepseekApiKey: 'your deepseek api key',          
  huggingfaceApiKey: 'your huggingface api key',
  togetherApiKey: 'your together api key',  
  replicateApiKey: 'your replicate api key',  
}; 