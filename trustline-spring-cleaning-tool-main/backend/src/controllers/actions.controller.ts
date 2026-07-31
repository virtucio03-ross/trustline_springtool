import type { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../database/prisma.js";
import { buildActionQuote } from "../services/stellar.service.js";

const quoteSchema = z.object({
  recordId: z.string().min(3),
  amount: z.coerce.number().positive(),
  asset: z.enum(["XLM", "USDC"]).default("XLM"),
  destination: z.string().min(10),
});

export async function listActions(_request: Request, response: Response) {
  const records = await prisma.workflowRecord.findMany({ orderBy: { createdAt: "desc" } });
  response.json({ project: "Trustline Spring Cleaning Tool", records });
}

export async function quoteAction(request: Request, response: Response) {
  const input = quoteSchema.parse(request.body);
  const quote = buildActionQuote({
    ...input,
    project: "Trustline Spring Cleaning Tool",
    method: "recordPaymentsRecord",
  });
  response.status(201).json(quote);
}
