import express, { Application, Response, Request, NextFunction } from "express";
import { router as routerAuth } from "./auth/routes/auth.routes";

import { router as routerAdminRoles } from "./admin/routes/admin.roles.routes";
import { router as routerAdmin } from "./admin/routes/admin.routes";
import { router as routerTip } from "./tip/routers/tip.routes";

import { router as routerTipCategory } from "./tip/routers/tip.category.routes";
import { router as routerUserIntranet } from "./user/routes/user.intranet.routes";
import { router as routerColorIntranet } from "./color_map/routes/color_map.type.routes";
import { router as routerDepartamentoIntranet } from "./ubicacion/routes/departamento.type.routes";
import { router as routerProvinciaIntranet } from "./ubicacion/routes/provincia.type.routes";
import { router as routerDistritoIntranet } from "./ubicacion/routes/distrito.type.routes";
import { router as routerNoticiasIntranet } from "./noticia/routers/noticia.routes";
import { router as routerUserDevice } from "./user/routes/user.device.routes";
import { router as routerUserAccount } from "./user/routes/user.account.routes";
import { router as routerCommentsAccount } from "./comments_map/routers/comments_map.routes";

import { router as termsConditions } from "./terms_and_conditions/routes/termsconditions.routes";

// import { router as userPackageAdmin } from './user_package/routes/user.package.admin.routes'

import { router as routerTipCategoryUser } from "./tip/routers/tip.category.user.routes";

// import { router as routerUserMetrics } from './metrics/routes/'

import { router as routerReport } from "./report/routes/report.routes";

import passportMiddleware from "../api/auth/passport/passport";
import passport from "passport";
import morgan from "morgan";
import cors from "cors";
import { Router } from "express";
import {
  deniedAccessUser,
  deniedAccessAdmin,
} from "../shared/express.validator";
import { renderImage } from "../helpers/render.image.routes";

export default class Server {
  private _app: Application;
  private _port: number;
  private _router: Router;
  constructor(port: number) {
    this._app = express();
    this._router = Router();
    this._port = port;
    this.middlewares();
    this.routes();
    this.errors();
  }

  static init(port: number): Server {
    return new Server(port);
  }
  middlewares(): void {
    this._app.use(cors({ credentials: true }));
    this._app.use(morgan("dev"));
    this._app.use(express.json({ limit: "350mb" }));
    this._app.use(
      express.urlencoded({
        limit: "350mb",
        extended: true,
        parameterLimit: 350000,
      })
    );

    this._router.use(passport.initialize());
    passport.use(passportMiddleware);
  }
  routes(): void {
    this._app.use("/api", this._router);

    //*@AUTH
    this._router.use("/", routerAuth);

    //*@USE GLOBAL
    this._router.get("/render-image/:image", renderImage);
    this._router.use("/terms-conditions", termsConditions);
    // this._router.use('/report', routerReport)
    //*@AUTHENTICATE
    this._router.use(passport.authenticate("jwt", { session: false }));
    this._router.use(
      "/updateIdDeviceUser",
      deniedAccessAdmin,
      routerUserDevice
    );

    //*@USE USER

    this._router.use("/user-account", deniedAccessAdmin, routerUserAccount);

    this._router.use("/comments", deniedAccessAdmin, routerCommentsAccount);
    /*     this._router.use("/ubigeo", routerCommentsAccount); */

    //*@USE ADMIN
    this._router.use("/report", deniedAccessUser, routerReport);

    this._router.use("/roles", deniedAccessUser, routerAdminRoles);
    this._router.use("/admins", deniedAccessUser, routerAdmin);
    this._router.use("/tips", deniedAccessUser, routerTip);

    this._router.use("/tips-categories", deniedAccessUser, routerTipCategory);

    this._router.use("/users-intranet", deniedAccessUser, routerUserIntranet);
    this._router.use("/color", deniedAccessUser, routerColorIntranet);
    this._router.use(
      "/departamento",
      deniedAccessUser,
      routerDepartamentoIntranet
    );
    this._router.use("/provincia", deniedAccessUser, routerProvinciaIntranet);
    this._router.use("/distrito", deniedAccessUser, routerDistritoIntranet);
    this._router.use("/noticias", deniedAccessUser, routerNoticiasIntranet);

    // this._router.use('/user-package', deniedAccessUser, userPackageAdmin)

    // this._router.use('/terms-conditions', deniedAccessUser, termsConditions)
  }

  errors(): void {
    this._router.use((req: Request, res: Response, next) => {
      const err = new Error(`Not Fount - ${req.originalUrl}`);
      res.status(404);
      next(err);
    });
    this._router.use(
      (err: any, req: Request, res: Response, next: NextFunction) => {
        console.log(err.stack);
        res.status(err.status || 500).json({
          status: err.status,
          message: err.message,
          stack: err.stack,
        });
      }
    );
  }

  start(callback: () => void): void {
    this._app.listen(this._port, callback);
  }
}
