import axios from "axios";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      try {
        const res = await axios.post("http://localhost:5000/api/auth/googleUser", {
          name: user.name,
          email: user.email,
          password: "google",
          image: user.image,
          provider: "google",
        });
        if (res.status === 201) {
            console.log(res)
          console.log("New user added to the database");
        } else if (res.status === 200) {
          console.log("User already exists in the database");
        }
        return true;
        
      } catch (error) {
        console.error("Error in user sign-in:", error);
        return false;
      }
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };

