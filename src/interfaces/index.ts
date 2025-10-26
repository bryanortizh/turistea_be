export interface IJsonRecommend {
  email: string;
  rol: number;
}
export interface ITemplate {
  redirect_buttom?: string;
  names?: string;
  banner?: string;
  code?: string;
}

export interface ITemplatePassword {
  names: string;
  email: string;
  password: string;
  redirect_buttom?: string;
}

export interface ITemplateClient {
  names: string;
  code: string;
}

export interface ITemplateAdmin {
  names: string;
  email: string;
  password: string;
  redirect_buttom?: string;
}