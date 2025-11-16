import express, { Application, Response, Request, NextFunction } from "express";
import { createServer, Server as HTTPServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { router as routerAuth } from "./auth/routes/auth.routes";
import { router as routerAdminRoles } from "./admin/routes/admin.roles.routes";
import { router as routerAdmin } from "./admin/routes/admin.routes";
import { router as routerUserIntranet } from "./user/routes/user.intranet.routes";
import { router as routerUserDevice } from "./user/routes/user.device.routes";
import { router as routerUserAccount } from "./user/routes/user.account.routes";
import { router as termsConditions } from "./terms_and_conditions/routes/termsconditions.routes";
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
  private _httpServer: HTTPServer;
  private _io: SocketIOServer;
  private _port: number;
  private _router: Router;
  
  constructor(port: number) {
    this._app = express();
    this._httpServer = createServer(this._app);
    this._io = new SocketIOServer(this._httpServer, {
      cors: {
        origin: [
          "http://localhost:3000",
          "http://localhost:5173",
          "https://turisteaweb-production.up.railway.app"
        ],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"]
      }
    });
    this._router = Router();
    this._port = port;
    this.middlewares();
    this.routes();
    this.socketEvents();
    this.errors();
  }

  static init(port: number): Server {
    return new Server(port);
  }
  
  get io(): SocketIOServer {
    return this._io;
  }
  
  middlewares(): void {
    this._app.use(cors({ 
      origin: [
        "http://localhost:4001",
        "http://localhost:5173",
        "https://turisteaweb-production.up.railway.app"
      ],
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      allowedHeaders: ["Content-Type", "Authorization"]
    }));
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
    //*@AUTHENTICATE
    this._router.use(passport.authenticate("jwt", { session: false }));
    this._router.use(
      "/updateIdDeviceUser",
      deniedAccessAdmin,
      routerUserDevice
    );

    //*@USE USER
    this._router.use("/user-account", deniedAccessAdmin, routerUserAccount);

    //*@USE ADMIN
    this._router.use("/report", deniedAccessUser, routerReport);
    this._router.use("/roles", deniedAccessUser, routerAdminRoles);
    this._router.use("/admins", deniedAccessUser, routerAdmin);
    this._router.use("/users-intranet", deniedAccessUser, routerUserIntranet);

  }

  socketEvents(): void {
    this._io.on("connection", (socket) => {
      console.log("Cliente conectado:", socket.id);

      socket.on("disconnect", () => {
        console.log("Cliente desconectado:", socket.id);
      });
    });
  }

  errors(): void {
    this._router.use((req: Request, res: Response, next) => {
      const err = new Error(`Not Fount - ${req.originalUrl}`);
      res.status(404);
      next(err);
    });
    this._router.use(
      (err: any, req: Request, res: Response, next: NextFunction) => {
        res.status(err.status || 500).json({
          status: err.status,
          message: err.message,
          stack: err.stack,
        });
      }
    );
  }

  start(callback: () => void): void {
    this._httpServer.listen(this._port, callback);
  }
}
