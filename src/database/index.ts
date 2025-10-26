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
import {
  DriversFactory,
  DriversStatic,
} from "../api/drivers/models/drivers.model";
import {
  PackagesFactory,
  PackagesStatic,
} from "../api/package/models/package.model";
import { driverHasManyPackages } from "./associations/driver";
import { GuideFactory, GuideStatic } from "../api/guide/models/guide.model";
import { guideHasManyPackages } from "./associations/guide";

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
  public drivers: DriversStatic;
  public packages: PackagesStatic;
  public action: ActionStatic;
  public guide: GuideStatic;

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
        dialectOptions: {
          // Para conexiones SSL si es necesario
          ssl: {
            require: true,
            rejectUnauthorized: false
          },
          // Configuraciones adicionales para serverless
          connectTimeout: 60000,
          acquireTimeout: 60000,
          timeout: 60000,
        },
        pool: {
          max: 2, // Reducido para serverless
          min: 0,
          idle: 1000, // Reducido para cerrar conexiones más rápido
          acquire: 3000, // Timeout para obtener conexión
          evict: 1000, // Tiempo antes de remover conexiones inactivas
        },
        retry: {
          match: [
            /ETIMEDOUT/,
            /EHOSTUNREACH/,
            /ECONNRESET/,
            /ECONNREFUSED/,
            /ETIMEDOUT/,
            /ESOCKETTIMEDOUT/,
            /EHOSTUNREACH/,
            /EPIPE/,
            /EAI_AGAIN/,
            /SequelizeConnectionError/,
            /SequelizeConnectionRefusedError/,
            /SequelizeHostNotFoundError/,
            /SequelizeHostNotReachableError/,
            /SequelizeInvalidConnectionError/,
            /SequelizeConnectionTimedOutError/,
          ],
          max: 3
        }
      }
    );
    this.user = UserFactory(this.sequelize);
    this.token = TokenFactory(this.sequelize);
    this.admin = AdminFactory(this.sequelize);
    this.adminRoles = AdminRolesFactory(this.sequelize);
    this.global = GlobalFactory(this.sequelize);
    this.termsAndConditions = TermsAndConditionsFactory(this.sequelize);
    this.action = ActionFactory(this.sequelize);
    this.drivers = DriversFactory(this.sequelize);
    this.packages = PackagesFactory(this.sequelize);
    this.guide = GuideFactory(this.sequelize);
    this.associations();
    this.connectDb();
  }
  public static get instance(): DataBase {
    return this._instance || (this._instance = new this());
  }
  private connectDb(): void {
    this.sequelize
      .authenticate()
      .then(() => {
        console.log("¡Run database!");
      })
      .catch((err) => {
        console.error("Database connection failed:", err);
        // En serverless, log el error pero no terminar el proceso
      });
  }
  private associations(): void {
    adminHasManyAdminRoles({
      admin: this.admin,
      adminRoles: this.adminRoles,
    });
    driverHasManyPackages({
      driver: this.drivers,
      package: this.packages,
    });
    /*   guideHasManyPackages({
      guide: this.guide,
      package: this.packages,
    }); */
  }
}
