import { Sequelize } from "sequelize";
import config from "../config/environments";
import { UserFactory, UserStatic } from "../api/user/models/user.model";
import { TokenStatic, TokenFactory } from "../api/token/models/token.model";
import { AdminFactory, AdminStatic } from "../api/admin/models/admin.model";
import { adminHasManyAdminRoles } from "./associations/admin";
import {
  AdminRolesStatic,
  AdminRolesFactory,
} from "../api/admin/models/admin.roles";
import { GlobalFactory, GlobalStatic } from "../api/global/models/global.model";
import {
  TermsAndConditionsStatic,
  TermsAndConditionsFactory,
} from "../api/terms_and_conditions/models/termsconditions.model";
import { ActionFactory, ActionStatic } from "../api/action/models/action.model";

export class DataBase {
  private static _instance: DataBase;
  public sequelize: Sequelize;
  private _config = config;
  public user: UserStatic;
  public admin: AdminStatic;
  public token: TokenStatic;
  public adminRoles: AdminRolesStatic;
  public global: GlobalStatic;
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
    this.admin = AdminFactory(this.sequelize);
    this.adminRoles = AdminRolesFactory(this.sequelize);
    this.global = GlobalFactory(this.sequelize);
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
        /* this.token.sync({ alter: true, logging: console.log });
         this.termsAndConditions.sync({ alter: true, logging: console.log }); 
        this.adminRoles.sync({ alter: true, logging: console.log });
        this.admin.sync({ alter: true, logging: console.log });  */
        //this.user.sync({ alter: true, logging: console.log });
        console.log("¡Run database!");
      })
      .catch((err) => console.log(err));
  }
  private associations(): void {
    adminHasManyAdminRoles({
      admin: this.admin,
      adminRoles: this.adminRoles,
    });
  }
}
