import { Context } from '../context'
import { COOKIE_DOMAIN, COOKIE_PATH, PARTNER_ACCESS_TOKEN_NAME } from '../values'

const jwtPartnerLogout = (ctx: Context) => {
    ctx.expressContext.res.clearCookie(PARTNER_ACCESS_TOKEN_NAME, { domain: COOKIE_DOMAIN, path: COOKIE_PATH })
    return
}

export default jwtPartnerLogout