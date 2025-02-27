import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { signUpInput,signInInput } from "@rehneet-singh/blogger-common";


export const userRouter= new Hono<{
	Bindings: {
		DATABASE_URL: string
        JWT_SECRET:string
	}
}>()

userRouter.post('/signup', async(c)=> {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body=await c.req.json();
  const {success}=signUpInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
        message:"Incorrect Inputs"
    })
  }

  try{
    const user = await prisma.user.create({
      data:{
        name:body.name,
        email:body.email,
        password:body.password,
      },
    })
    const token= await sign({id:user.id},c.env.JWT_SECRET)
    console.log(user);
    return c.json({
      jwt:token
    })
  }
  catch(e){
    return c.status(403)
  }

})


userRouter.post('/signin', async(c)=>{ 
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body=await c.req.json();

  const {success}=signInInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
        message:"Incorrect Inputs"
    })
  }
  
  const user= await prisma.user.findUnique({
    where:{
      email:body.email,
      password:body.password,
    }
  })
  if(!user){
    c.status(403)
    return c.json({error:"User Not Found or Incorrect credentials"})
  }
  const token= await sign({id:user.id},c.env.JWT_SECRET)
  return c.json({token})
 
})
