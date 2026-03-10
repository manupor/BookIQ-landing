import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const landingPageSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  htmlContent: z.string(),
  cssContent: z.string().optional(),
  slug: z.string().min(1),
  published: z.boolean().optional(),
})

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const landingPages = await prisma.landingPage.findMany({
      where: {
        userId: session.user.id
      },
      orderBy: {
        updatedAt: 'desc'
      }
    })

    return NextResponse.json({ landingPages })
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const data = landingPageSchema.parse(body)

    const existingPage = await prisma.landingPage.findUnique({
      where: { slug: data.slug }
    })

    if (existingPage) {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 400 }
      )
    }

    const landingPage = await prisma.landingPage.create({
      data: {
        ...data,
        userId: session.user.id,
      }
    })

    return NextResponse.json({ landingPage })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}
