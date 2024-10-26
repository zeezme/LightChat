import { Router } from 'express'

import UsersController from '../Controller/Controller'

const router = Router()

router.get('/', UsersController.index)

router.get('/:id', UsersController.show)

router.post('/', UsersController.store)

router.put('/:id', UsersController.update)

router.delete('/:id', UsersController.delete)

export default router
