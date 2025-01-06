import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { createBlogInput,updateBlogInput } from "@rehneet-singh/blogger-common";

export const blogRouter= new Hono<{
	Bindings: {
		DATABASE_URL: string
        JWT_SECRET:string
	};
    Variables:{
        userId:any
    }
}>()

blogRouter.use('/*', async (c, next) => {
  const header=c.req.header("Authorization") || ""
  try{
    const response= await verify(header,c.env.JWT_SECRET)
    if(response.id){
      c.set("userId",response.id)
      await next();
    }
    else{
        c.status(403)
        return c.json({error:"Unauthorized"})
      }
  }
  catch(e){
    c.status(403)
    return c.json({error:"Unauthorized"})
  }
})


blogRouter.post('/', async(c)=>{ 
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body=await c.req.json();
  const authId=c.get("userId")

  const {success}=createBlogInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      message:"Incorrect Inputs"
    })
  }

  const blog = await prisma.post.create({
    data:{
        title:body.title,
        content:body.content,
        authorId:authId

    }
  })
  return c.json({
    id:blog.id
  })
})


blogRouter.put('/',async(c)=>{ 
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body=await c.req.json();
  const {success}=updateBlogInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      message:"Incorrect Inputs"
    })
  }
  const blog = await prisma.post.update({
    where:{
        id:body.id
    },
    data:{
        title:body.title,
        content:body.content,
    }
  })
  return c.json({
    id:blog.id
  })
})

blogRouter.get('/bulk',async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blogs=await prisma.post.findMany();
  
    return c.json({
      blogs
    })
  })

blogRouter.get('/:id',async(c)=>{ 
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const id= c.req.param("id");
  try{
    const blog = await prisma.post.findFirst({
        where:{
            id:id
        }
    })
    return c.json({blog})
  }
  catch(e){
    c.status(411)
    return c.json({
        error:"Blog Not Found"
    })
  }
})


