import { Sequelize } from "sequelize";
import config from "../config/environments";
import { UserFactory, UserStatic } from "../api/user/models/user.model";
import { TokenStatic, TokenFactory } from "../api/token/models/token.model";

import { AdminFactory, AdminStatic } from "../api/admin/models/admin.model";
/* 
import {
  userHasManyProvincia,
  userHasManyDistrito,
  userHasManyDepartamento,
  //  , userHasManyEntryType
} from "./associations/user"; */
import { adminHasManyAdminRoles } from "./associations/admin";

import {
  AdminRolesStatic,
  AdminRolesFactory,
} from "../api/admin/models/admin.roles";

import { GlobalFactory, GlobalStatic } from "../api/global/models/global.model";
import { TipStatic, TipFactory } from "../api/tip/models/tip.model";

import {
  TipCategoryFactory,
  TipCategoryStatic,
} from "../api/tip/models/tip.category.model";

import { tipCategoryHasManyTip } from "./associations/tip";

import {
  TermsAndConditionsStatic,
  TermsAndConditionsFactory,
} from "../api/terms_and_conditions/models/termsconditions.model";

import { ActionFactory, ActionStatic } from "../api/action/models/action.model";
import {
  ColorTypeFactory,
  ColorTypeStatic,
} from "../api/color_map/models/color_map.model.model";
import {
  CommentsFactory,
  CommentsStatic,
} from "../api/comments_map/models/comments_map.model";
import {
  DepartamentoTypeFactory,
  DepartamentoTypeStatic,
} from "../api/ubicacion/models/departamento.model";
import {
  ProvinciaTypeFactory,
  ProvinciaStatic,
} from "../api/ubicacion/models/provincia.model";
import {
  DistritoTypeFactory,
  DistritoStatic,
} from "../api/ubicacion/models/distrito.model";
import {
  NoticiaTypeFactory,
  NoticiaStatic,
} from "../api/noticia/models/noticia.model";

import { provinciaHasManyDepartamento } from "./associations/provincia";
import { DistritoHasManyProvincia } from "./associations/distrito";
import {
  noticiaHasManyDepartamento,
  noticiaHasManyDistrito,
  noticiaHasManyProvincia,
} from "./associations/noticia";
import { commentsHasManyUser } from "./associations/comments";
import {
  UbigeoTypeFactory,
  UbigeoTypeStatic,
} from "../api/ubigeo/models/ubigeo_map.model.model";

export class DataBase {
  private static _instance: DataBase;
  public sequelize: Sequelize;
  private _config = config;
  public user: UserStatic;
  public admin: AdminStatic;
  public token: TokenStatic;
  public colorMap: ColorTypeStatic;
  public ubigeoMap: UbigeoTypeStatic;
  public commentsMap: CommentsStatic;
  public departamento: DepartamentoTypeStatic;
  public provincia: ProvinciaStatic;
  public distrito: DistritoStatic;
  public noticia: NoticiaStatic;

  public adminRoles: AdminRolesStatic;
  public global: GlobalStatic;
  public tip: TipStatic;

  public tipCategory: TipCategoryStatic;

  public termsAndConditions: TermsAndConditionsStatic;

  public action: ActionStatic;

  constructor() {
    this.sequelize = new Sequelize(
      this._config.PROY_BD!,
      this._config.PROY_BD_USER!,
      this._config.PROY_BD_PASS,
      {
        host: this._config.PROY_BD_HOST,
        port: Number(this._config.PROY_BD_PORT),
        logging: false,
        dialect: "mysql",
        pool: {
          max: 5,
          min: 0,
          idle: 10000,
        },
      }
    );
    this.user = UserFactory(this.sequelize);
    this.token = TokenFactory(this.sequelize);

    this.colorMap = ColorTypeFactory(this.sequelize);
    this.ubigeoMap = UbigeoTypeFactory(this.sequelize);
    this.commentsMap = CommentsFactory(this.sequelize);
    this.departamento = DepartamentoTypeFactory(this.sequelize);
    this.provincia = ProvinciaTypeFactory(this.sequelize);
    this.distrito = DistritoTypeFactory(this.sequelize);
    this.noticia = NoticiaTypeFactory(this.sequelize);
    this.admin = AdminFactory(this.sequelize);
    this.adminRoles = AdminRolesFactory(this.sequelize);
    this.global = GlobalFactory(this.sequelize);
    this.tip = TipFactory(this.sequelize);

    this.tipCategory = TipCategoryFactory(this.sequelize);

    this.termsAndConditions = TermsAndConditionsFactory(this.sequelize);

    this.action = ActionFactory(this.sequelize);

    this.associations();
    this.connectDb();
  }
  public static get instance(): DataBase {
    return this._instance || (this._instance = new this());
  }
  private connectDb(): void {
    this.sequelize
      .authenticate()
      // .sync({ alter: true, logging: console.log })
      .then(() => {
        /*     this.commentsMap.sync({ alter: true, logging: console.log });
        this.action.sync({ alter: true, logging: console.log });
        this.admin.sync({ alter: true, logging: console.log });
        this.adminRoles.sync({ alter: true, logging: console.log });
        this.colorMap.sync({ alter: true, logging: console.log });
        this.departamento.sync({ alter: true, logging: console.log });
        this.provincia.sync({ alter: true, logging: console.log });
        this.distrito.sync({ alter: true, logging: console.log });
        this.global.sync({ alter: true, logging: console.log });
        this.user.sync({ alter: true, logging: console.log });
        this.ubigeoMap.sync({ alter: true, logging: console.log });
        this.token.sync({ alter: true, logging: console.log });
        this.termsAndConditions.sync({ alter: true, logging: console.log }); */

        /* this.admin.sync({ alter: true, logging: console.log }); */

        // this.bank.sync({ alter: true, logging: console.log })
        console.log("¡Run database!");
      })
      .catch((err) => console.log(err));
  }
  private associations(): void {
    /*     userHasManyDepartamento({
      departamento: this.departamento,
      user: this.user,
    });

    userHasManyProvincia({
      provincia: this.provincia,
      user: this.user,
    });

    userHasManyDepartamento({
      departamento: this.departamento,
      user: this.user,
    });

    userHasManyProvincia({
      provincia: this.provincia,
      user: this.user,
    });

    userHasManyDistrito({
      distrito: this.distrito,
      user: this.user,
    }); */
    commentsHasManyUser({
      comments: this.commentsMap,
      user: this.user,
    });

    // userHasManyEntryType({
    //   entry_type: this.entryType,
    //   user: this.user,
    // })
    adminHasManyAdminRoles({
      admin: this.admin,
      adminRoles: this.adminRoles,
    });

    provinciaHasManyDepartamento({
      departamento: this.departamento,
      provincia: this.provincia,
    });
    DistritoHasManyProvincia({
      provincia: this.provincia,
      distrito: this.distrito,
    });

    /*     noticiaHasManyDepartamento({
      departamento: this.departamento,
      noticia: this.noticia,
    }); */

    /*   noticiaHasManyProvincia({
      provincia: this.provincia,
      noticia: this.noticia,
    });
 */
    /*     noticiaHasManyDistrito({
      distrito: this.distrito,
      noticia: this.noticia,
    }); */

    tipCategoryHasManyTip({
      tip: this.tip,
      tipCategory: this.tipCategory,
    });

    // userbelongsToMany({
    //   _package:this.package,
    //   user:this.user
    // })
  }
}
