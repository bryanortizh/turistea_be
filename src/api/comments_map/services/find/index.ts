import { DataBase } from "../../../../database";
import {
  CommentsModel,
  CommentsAttributes,
} from "../../models/comments_map.model";
import { Op, Order, WhereOptions } from "sequelize";
import { FindAttributeOptions } from "sequelize/types";
import { LoginTicket } from "google-auth-library";

export interface IFindAllTips {
  page: number;
  rows: CommentsModel[];
  count: number;
}

export const SearchComments = async ({
  regex,
  order,
}: {
  regex?: string;
  order: Order;
}) => {
  try {
    const limit: number = 12;
    const tips = await DataBase.instance.tip.findAll({
      where: {
        state: true,
        [Op.or]: {
          id: {
            [Op.regexp]: regex,
          },
          title: {
            [Op.regexp]: regex,
          },
          motivation: {
            [Op.regexp]: regex,
          },
          tip: {
            [Op.regexp]: regex,
          },
          "$tip_category.category$": { [Op.regexp]: regex },
        },
      },
      include: [
        {
          model: DataBase.instance.tipCategory,
          attributes: ["id", "category"],
          required: true,
          // where:{
          //   category:{
          //     [Op.regexp]:regex
          //   }
          // }
        },
      ],
      attributes: [
        "title",
        "tip",
        "motivation",
        "tip",
        "id",
        "tip_category_id",
        "size",
        "key",
        "path",
      ],
      order,
      limit,
      // logging:console.log
    });
    return tips;
  } catch (err) {
    throw err;
  }
};

export const findAllCommentsAll = async () => {
  try {
    const _prov = await DataBase.instance.commentsMap.findAll({
      attributes: {
        include: [
          "id",
          "coment_text",
          "id_user",
          "coment_calificacion",
          "lat_direccion",
          "long_direccion",
          "coment_motivo",
          "created",
          "updated",
        ],
      },
      include: [
        {
          model: DataBase.instance.user,
          as: "user",
          required: true,
          attributes: {
            include: ["id", "name", "lastname"],
          },
        },
      ],
      order: [["id", "ASC"]],
    });
    return _prov;
  } catch (err) {
    throw err;
  }
};

export const findAllComments = async ({
  where,
  attributes,
}: {
  where: WhereOptions<CommentsAttributes>;
  attributes?: FindAttributeOptions;
}): Promise<any> => {
  try {
    const _prov = await DataBase.instance.commentsMap.findAll({
      where,
      attributes,
      /*   attributes: {
        include: [
          'id',
          'coment_text',
          'id_user',
          'coment_calificacion',
          'lat_direccion',
          'long_direccion',
          'coment_motivo',
          'created',
          'updated',
        ],
      }, */
      order: [["id", "DESC"]],

      include: [
        {
          model: DataBase.instance.user,
          as: "user",
          required: true,
          attributes: {
            include: ["id", "name", "lastname"],
          },
        },
      ],
    });
    return _prov;
  } catch (err) {
    throw err;
  }

  /*  try {
    return await DataBase.instance.commentsMap.findAll()
  } catch (err) {
    throw err
  } */
};
export const findOneTip = async (
  where: WhereOptions<CommentsAttributes>
): Promise<CommentsAttributes | undefined> => {
  /*   try {
    const _prov = await DataBase.instance.commentsMap.findAll({
      attributes: {
        include: ['id', 'coment_text'],
      },
      include: [
        {
          model: DataBase.instance.user,
          as: 'usuario',
          required: true,
          attributes: {
            include: ['id', 'name','lastname'],
          },
        },
      ],
      order: [['id', 'ASC']],
    })
    return _prov
  } catch (err) {
    throw err
  }
 */
  try {
    return (
      await DataBase.instance.tip.findOne({
        where,
      })
    )?.get({ plain: true });
  } catch (err) {
    throw err;
  }
};
export const FilterTips = async (
  ids_tips: Array<number>,
  tip_category_id: number
) => {
  try {
    const tips = await DataBase.instance.tip.findAll({
      where: {
        state: true,
        id: {
          [Op.in]: ids_tips,
        },
      },
      include: [
        {
          model: DataBase.instance.tipCategory,
          attributes: {
            exclude: ["updated_by", "created_by", "updated", "created"],
          },
          where: {
            id: tip_category_id,
          },
        },
      ],
      attributes: {
        exclude: [
          "size",
          "created_by",
          "updated_by",
          "updated",
          "created",
          "key",
          "tip_category_id",
        ],
      },
      logging: console.log,
    });

    return tips;
  } catch (error) {
    throw error;
  }
};

export const getFindIdsTips = async ({
  map_content_id_metrics,
  tip_category_id,
}: {
  map_content_id_metrics: any;
  tip_category_id: number;
}): Promise<CommentsAttributes[]> => {
  try {
    const tips: CommentsAttributes[] = await DataBase.instance.tip.findAll({
      where: {
        id: {
          [Op.in]: map_content_id_metrics,
        },
        tip_category_id,
      },
      attributes: ["id"],
    });
    return tips;
  } catch (error) {
    throw error;
  }
};
