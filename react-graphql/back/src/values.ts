

export const ACCESS_TOKEN_NAME = 'accessToken'
export const PARTNER_JWT_EXPRISEIN = 1000 * 60 * 60 * 24 * 21 // 3 weeks
export const PARTNER_ACCESS_TOKEN_NAME = 'partnerAccessToken'
export const USER_ACCESS_TOKEN_NAME = 'userAccessToken'
export const USER_JWT_EXPRISEIN = 1000 * 60 * 60 * 24 * 365
export const COOKIE_DOMAIN = process.env.NODE_ENV === 'production' ? '.react-graphql.shop' : undefined
export const COOKIE_PATH = '/'