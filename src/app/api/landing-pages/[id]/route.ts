import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const updateSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  htmlContent: z.string().optional(),
  cssContent: z.string().optional(),
  slug: z.string().min(1).optional(),
  published: z.boolean().optional(),
})

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const landingPage = await prisma.landingPage.findUnique({
      where: {
        id: id,
        userId: session.user.id
      }
    })

    if (!landingPage) {
      return NextResponse.json(
        { error: "Landing page not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ landingPage })
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const data = updateSchema.parse(body)

    const existingPage = await prisma.landingPage.findUnique({
      where: {
        id: id,
      }
    })

    if (!existingPage) {
      return NextResponse.json(
        { error: "Landing page not found" },
        { status: 404 }
      )
    }

    if (existingPage.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      )
    }

    if (data.slug && data.slug !== existingPage.slug) {
      const slugExists = await prisma.landingPage.findUnique({
        where: { slug: data.slug }
      })

      if (slugExists) {
        return NextResponse.json(
          { error: "Slug already exists" },
          { status: 400 }
        )
      }
    }

    const landingPage = await prisma.landingPage.update({
      where: {
        id: id,
      },
      data,
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

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const existingPage = await prisma.landingPage.findUnique({
      where: {
        id: id,
      }
    })

    if (!existingPage) {
      return NextResponse.json(
        { error: "Landing page not found" },
        { status: 404 }
      )
    }

    if (existingPage.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      )
    }

    await prisma.landingPage.delete({
      where: {
        id: id,
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}
