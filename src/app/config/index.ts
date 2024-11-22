import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  super_admin_password: process.env.SUPER_ADMIN_PASSWORD,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUND,

  r2Storage: {
    url: {
      experiences: process.env.EXPERIENCES,
      projects: process.env.PROJECTS,
      skills: process.env.SKILLS,
      blog: process.env.BLOGS,
    },
    endpoint: process.env.ENDPOINT,
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
    signatureVersion: process.env.SIGNATUREVERSION,
    region: process.env.REGION,
  },
};
