let APPLICATION_BFF_URL

if(process.env.NODE_ENV !== 'production')

{
    APPLICATION_BFF_URL = "http://13.127.202.129:2005/customer-bff";
    
}
else
{
APPLICATION_BFF_URL = "https://customerdeverp.allonblock.com/customer-bff";
}

export {APPLICATION_BFF_URL};

