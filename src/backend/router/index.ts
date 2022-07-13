import * as trpc from "@trpc/server";
import { z } from "zod";
import { prisma } from "@/backend/utils/prisma";

export const appRouter = trpc
  .router()
  .query("get-pokemon-by-id", {
    input: z.object({ id: z.number() }),
    async resolve({ input }) {
      const pokemon = prisma.pokemon.findFirst({ where: { id: input.id } });

      if (!pokemon) throw new Error("lol doesn't exist");
      return pokemon;
    },
  })
  .mutation("cast-vote", {
    input: z.object({
      votedFor: z.number(),
      votedAgainst: z.number(),
    }),
    async resolve({ input }) {
      const voteInDb = await prisma.vote.create({
        data: {
          ...input,
        },
      });

      return { success: true, voteInDb };
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;
