import jwt from "jsonwebtoken";
import { ConfigEnv } from "../configs";

/**
 *
 * @param data payload
 * @param options jwt.SignOptions
 * @returns JWT token
 */
const generateAccessToken = function (data: any, options = {}) {
  return jwt.sign({ ...data, isAccess: true }, ConfigEnv.JWT_SECRET, {
    expiresIn: ConfigEnv.ACCESS_TOKEN_EXPIRE,
    ...options,
  });
};

/**
 *
 * @param data payload
 * @param options jwt.SignOptions
 * @returns JWT token
 */
const generateRefreshToken = function (data: any, options = {}) {
  return jwt.sign({ ...data, isRefresh: true }, ConfigEnv.JWT_SECRET, {
    expiresIn: ConfigEnv.REFRESH_TOKEN_EXPIRE,
    ...options,
  });
};

/**
 *
 * @param token JWT
 * @returns string | jwt.JwtPayload
 */
const verifyToken = function (token: string): string | jwt.JwtPayload {
  return jwt.verify(token, ConfigEnv.JWT_SECRET);
};

export const JWTUtils = { generateAccessToken, generateRefreshToken, verifyToken };
