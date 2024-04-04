import { eq } from 'drizzle-orm';
import { db } from './db';
import { users, type User, type UpdateUser } from './schemas';

export const getUserByEmail = async (email: string) => {
	const user = await db.select().from(users).where(eq(users.email, email));
	if (user.length === 0) {
		return null;
	} else {
		return user[0];
	}
};

export const getUserByToken = async (token: string) => {
	// const user = await db.select().from(users).where(eq(users.token, token));
	// if (user.length === 0) {
	return null;
	// } else {
	// 	return user[0];
	// }
};

export const updateUser = async (id: string, user: UpdateUser) => {
	const result = await db.update(users).set(user).where(eq(users.id, id)).returning();
	if (result.length === 0) {
		return null;
	} else {
		return result[0];
	}
};

export const createUser = async (user: User) => {
	const result = await db.insert(users).values(user).onConflictDoNothing().returning();
	if (result.length === 0) {
		return null;
	} else {
		return result[0];
	}
};
