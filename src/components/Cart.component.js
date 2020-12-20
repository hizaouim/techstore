import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import Article from './Article.component';

const Cart = (props) => {

    const [list, setList ] = useState([])
    const [artlist, setartList ] = useState([])


    useEffect ( () =>
    {      
        var url = 'http://localhost:5000/cart/'+props.match.params.id

        const func = async () => 
        {
            console.log('debut1' + props.match.params.id);
            const res =  await Axios.get (url)
            console.log('fin1'+ JSON.stringify(res.data));
            setList (res.data)
        }
     
        func()
                  
}, [])

useEffect (() =>
{
    console.log('debut 2' ); 
    
     function func2 ()  {

    const res =   Promise.all ( list.map( async (art) => 
    {
        const data = await Axios.get('http://localhost:5000/articles/' + art.articleId)
      //  console.log('ddd' +  JSON.stringify( data));
        //setartList( data.data)
        //setartList( data.data);
        setartList(artlist => [...artlist, data.data]);

        return data
        
    }))
      //  console.log('1111111' + res);
    }

    func2 ()
                              
}, [list])

function dispList()  
{
    console.log('hhere' + JSON.stringify (artlist));
    //var result = Object.keys(artlist).map((key) => [artlist[key]]);
    //console.log('res' + JSON.stringify(result));

    if (  artlist.length > 0 )
    
    {
        console.log('hhere' +artlist.length);
  
        console.log('ifffff');
        return    artlist.map (article => {
            console.log('ttt' + article);
            return  (  <Article article={article} /> )
        })
    }
}
        

return (
    <div>
           
                {
                  dispList()
                }
    </div>
);
};

export default Cart;