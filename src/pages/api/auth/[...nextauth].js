import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDb from "@/lib/connectToDb";
import bcrypt from "bcryptjs";
import User from "@/model/userModel";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await connectToDb();
        const user = await User.findOne({ email: credentials.email });
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          // Return user data without the password
          const { password, ...userWithoutPassword } = user.toObject();
          return userWithoutPassword;
        }
        throw new Error("Email or password is incorrect");
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    encryption: true,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Add additional user info to the JWT token
        token.id = user.id;
        token.name = user.firstName + " " + user.lastName;
      }
      return token;
    },
    async session({ session, token }) {
      // Add additional user info to the session
      session.user.id = token.id;
      session.user.name = token.name;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
