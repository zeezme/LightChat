import { Router } from 'express'

import PersonController from '../Controller/PersonController.js'

const router = Router()

router.get('/', PersonController.index)

router.get('/:id', PersonController.show)

router.post('/', PersonController.store)

router.put('/:id', PersonController.update)

router.delete('/:id', PersonController.delete)

export default router
