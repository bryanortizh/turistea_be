import sequelize, { Op } from 'sequelize'

import moment from 'moment'
import { DataBase } from './database'
import { SendNotificationForUsers } from './utils/send.notifications'
import cron from 'node-cron'
import { emitFormReserveStatusChange } from './utils/socket'

export const availableNotificationController = async () => {
    rejectPendingFormReservesCron()
}

export const rejectPendingFormReservesCron = () => {
	// Ejecutar cada 3 días a medianoche (00:00)
	cron.schedule('0 0 */3 * *', async () => {
		try {
			console.log('⏱️  Cron: buscando form_reserve con status "pending" y creadas hace >5 días')
			const now = new Date()
			// Usar moment para comparar por fecha completa: inicio del día hace 5 días
			const fiveDaysAgo = moment().subtract(5, 'days').startOf('day').toDate()
			console.log('⏱️  Cron: fiveDaysAgo =', fiveDaysAgo.toISOString())
			const pendingReserves: any[] = await DataBase.instance.formReserve.findAll({
				where: { status_form: 'pending', state: true, created: { [Op.lte]: fiveDaysAgo } },
			})

			if (!pendingReserves || pendingReserves.length === 0) {
				console.log('⏱️  Cron: no hay reservas pendientes')
				return
			}

			const ids = pendingReserves.map((r: any) => r.id)

			if (ids.length === 0) {
				console.log('⏱️  Cron: no hay reservas que cumplan la condición de 5 días')
				return
			}

			await DataBase.instance.formReserve.update(
				{ status_form: 'rejected', updated: now },
				{ where: { id: { [Op.in]: ids } } }
			)

			for (const r of pendingReserves) {
				try {
					emitFormReserveStatusChange({
						formReserveId: r.id,
						newStatus: 'rejected',
						previousStatus: r.status_form || 'pending',
						updatedAt: now,
					})
				} catch (err) {
					console.error('Error emitiendo socket para form_reserve', r.id, err)
				}
			}

			console.log(`✅ Cron: ${ids.length} reservas pendientes rechazadas`)
		} catch (err) {
			console.error('❌ Cron: error al procesar reservas pendientes', err)
		}
	})
}

export const startSchedulers = () => {
	try {
		rejectPendingFormReservesCron()
		console.log('⏱️  Scheduler: rejectPendingFormReservesCron iniciado')
	} catch (err) {
		console.error('❌ Scheduler: error iniciando rejectPendingFormReservesCron', err)
	}
}
