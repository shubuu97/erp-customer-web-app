let APPLICATION_BFF_URL

if(process.env.NODE_ENV !== 'production')

{
    APPLICATION_BFF_URL = "https://deverp.allonblock.com/customer-bff";
    
}
else
{
APPLICATION_BFF_URL = "https://erp.allonblock.com/customer-bff";
}

export {APPLICATION_BFF_URL};

