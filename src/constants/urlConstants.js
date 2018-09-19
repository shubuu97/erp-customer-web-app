let APPLICATION_BFF_URL
console.log("ENV ++", process.env);
if(process.env.NODE_ENV !== 'production')

{
    APPLICATION_BFF_URL = "https://deverp.allonblock.com/customer-bff";
    
}
else
{
APPLICATION_BFF_URL = process.env.APPLICATION_BFF_URL;
}

export {APPLICATION_BFF_URL};

