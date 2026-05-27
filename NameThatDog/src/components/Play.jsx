import React, { useState, useEffect } from 'react'
import {Badge, Container, Button, Row, ProgressBar} from 'react-bootstrap'
import border from '../assets/border.png'
import GameOver from './GameOver'

import LeaderBoard from './LeaderBoard'
import NextLevel from './NextLevel'
import Landing from './landing'
import sadDog from '../assets/sadDog.png'
import dog from '../assets/dog.png'
import bone from '../assets/bone.png'
import happyDog from '../assets/happyDog.png'
import bowl from '../assets/bowl.png'
import YouWin from './YouWin'

function Play({start, setStart, youWin, setYouWin, highScore}) {
  const [newHighScore, setNewHighScore] = useState(0)
  const [alertHighScore, setAlertHighScore] = useState(false)
    const [question, setQuestion] = useState(0)
    const [correct, setCorrect] = useState(null)
    const [level, setLevel] = useState(1)
    const [nextLevel, setNextLevel] = useState(false)
    const [lives, setLives] = useState(Array.from({length: 3}, () => '💗'))
    
    const [dogChoices, setDogChoices] = useState([])
    const [gameOver, setGameOver] = useState(false)
    const [selected, setSelected]=useState([])
    const [score, setScore] = useState(0)
    const [users, setUsers] = useState([])
   
    const [message, setMessage]= useState('+10')
    const [showMessage, setShowMessage] = useState(false)
    const [timer, setTimer] = useState(10)
    const [color, setColor] = useState('success')
    const [easyIndex, setEasyIndex] = useState(0)
    const [mediumIndex, setMediumIndex] = useState(0)
    const [hardIndex, setHardIndex] = useState(0)
    const [superHardIndex, setSuperHardIndex] = useState(0)
    const rightChoice = []
    const wrongChoice = {sadDog}
    const choices = [
       
        'Austrailian Shepherd',
        'Corgi',
        'Chow',
        'Great Dane',
        'Chihuahua',
        'Rodesian Ridgeback',
        'Labrador Retriever',
        'German Shepherd',
        'Poodle',
        'Beagle',
        'Boxer',
        'Bulldog',
        'Rottweiler',
        'Doberman Pinscher',
        'Siberian Husky',
        'Shih Tzu',
        'Yorkshire Terrier',
        'Dachshund',
        'Border Collie',
        'Bernese Mountain Dog',
        'Maltese',
        'Pug',
        'French Bulldog',
        'Cavalier King Charles Spaniel',
        'Bichon Frise',
        'Akita',
        'Alaskan Malamute',
        'Weimaraner',
        'Newfoundland',
        'Saint Bernard',
        'Great Pyrenees',
        'English Springer Spaniel',
        'Miniature Schnauzer',
        'Papillon',
        'Collie',
        'Whippet',
        'Greyhound',
        'Irish Setter',
        'Scottish Terrier',
        'Basenji',
        'Samoyed',
        'Havanese',
        'Bloodhound',
        'Australian Cattle Dog',
        'Shar Pei',
        'Boston Terrier',
        'Pointer'
      ]
     
      const easy =[
        {
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1F0XjG4deDAfRYshzTsuk7Ao4sXGgFIc21Q&s',
            
            correct: ['Golden Retriever'],
        },
        {
            image: 'https://mywoof.com/cdn/shop/files/dog-breed-profile-australian-shepherd_20251219010134_20251219.jpg',
          
            correct: ['Austrailian Shepherd'],
        },
        {
            image: 'https://images.wagwalkingweb.com/media/breed/havanese/appearance/havanese.png?auto=compress&fit=max',
           
            correct: ['Havenese'],
        },
        {
            image: 'https://bestforpet.co.nz/wp-content/uploads/2025/07/Labrador_Retriever_1200x800.jpg',
            
            correct: ['Labrador Retriever'],
        },
        {
            image: 'https://www.akc.org/wp-content/uploads/2017/11/German-Shepherd-on-White-00.jpg',
            
            correct: ['German Shepherd'],
        },
        {
            image: 'https://www.dailypaws.com/thmb/B6yWhzGpQZsg3kxMzLn-hvGIF7M=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/siberian-husky-100800827-2000-9449ca147e0e4b819bce5189c2411188.jpg',
            
            correct: ['Husky'],
        },
        {
            image: 'https://cdn.britannica.com/79/8179-050-F1398EAA/Chow-chow.jpg',
           
            correct: ['Chow Chow'],
        },
        {
            image: 'https://cdn.britannica.com/56/236456-050-D13140E2/Chinese-shar-pei-dog.jpg',
            
            correct: ['Sharpei'],
        },
        {
            image: 'https://cdn.wamiz.fr/cdn-cgi/image/format=auto,quality=80,width=1200,height=675,fit=cover/animal/breed/dog/adult/6669646264217030983623.jpg',
            
            correct: ['Pitbull'],
        },
        {
            image: 'https://pet-health-content-media.chewy.com/wp-content/uploads/2025/08/22013627/french-bulldog.jpeg',
            
            correct: ['French Bulldog'],
        },
        {
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgEelvHtFkwS178kVwly12DgKmmFlG4_WRwpcicXkQz6HnUQ206gXoLogbJuDlovd6OcPIxnp843XVtw46WTNLjB058R8pLwp9cG77oN3_&s=10',
            
            correct: ['Beagle'],
        },
        {
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzNyDJg4hUO9SX_Zm4fBG8FDD6NAngCgUd7WOg4MpqcsfJBc0CyAHP5msmds2HjTLrDDCIW58u6VKnuEWy9UIObAkZVd_SZbk4uxteri3P&s=10',
            
            correct: ['Poodle'],
        },
        {
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxm-GINUAETWgHq2r2TguI4ALVEqm_alcvE6fSwuionoqsV-7ipmxzZOwpE6KeUWAP9CrqukGQSRyW5mcBONUMusbnh1sf8dxyjRcA0BMMlg&s=10',
            
            correct: ['Chihuahua'],
        },
        {
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBwv-lwXq0VosyFdhJVpQwhZxQzfMFAVqTJNG8cdHmQP8Czy3rr5Vn3SCD78h23vnu6cbVEa9YyIk8shJkwZAeO0NWbaUhEOESS6pYrWC8GA&s=10',
            
            correct: ['Dachshund'],
        },
        {
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_xo7XYJHxrpTWWmDvm1EfefqVQAp_0iFx-JUfn4Au8tMerEl_QvKT74Ltc908-5g7YgjjRIWbHAcxsgNgO92RkXfFq3RvZKSdsxR9NwIx&s=10',
            
            correct: ['Pug'],
        },
        {
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV_VaUcxNgxf5qQaLYli-t0UJwR38FbUcOBiJdD_1tbdAgfqImcZhCcl03r3T6q2bkpcMv3TiLzWScHea2ETWtvRVVjFgJ92grvb75NgiM&s=10',
            
            correct: ['Rottweiler'],
        },
        {
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK23jimYm2MEP5T8K6tE0YOGyYJbyLl5eqVdeIhUL7vVlMbPUhU3lfRR_Pde7HYAp_0USetMEi_3e6cs-s14cogUKdvU37JGLl-UScX_XFNw&s=10',
            
            correct: ['Border Collie'],
        },
        {
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrjBja3r3T2IOQxR7W7EMVDVGENI55S-JHl7HVUTgk0uUXAFMQuixGzKpwUt5-RaQNNCTSTQKsFV0yd9PhnsGPnTYEtyHwZzZhteIPkSIO&s=10',
            
            correct: ['Australian Cattle Dog'],
        },
        {
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP5ig0KuXgmxLRFwr3GwWyzuK0NS-Fm_XW5mzgdfyI5kv9GAjxShPh1FOW6fgC32_EZkAkXV9rYChhdiE_D4Y84Y0a248-lYhFL2oqlTAN&s=10',
            
            correct: ['Afghan Hound'],
        },
        {
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_ljjHDO7qxWongdgapugaXiVquTOnMNoDhXADpc36ZkR8x45WILf5s7aHWTrdMaXEVVtCD2xd69ro-pxdAIpHBZRa53F90VQ28_fgqB1ADQ&s=10',
            
            correct: ['Bichon Frise'],
        },
    ]

    const medium =[
        {
            image: 'https://thechisociety.com/storage/2025/03/chihuahua-pitbull-mix-4.jpg',
            
            correct: ['Chihuahua', 'Pitbull'],
        },
        {
            image: 'https://www.thesprucepets.com/thmb/5gVqortnkIm_xZCDhY03W2DwtJ0=/3600x0/filters:no_upscale():strip_icc()/goldendoodle-dogs-and-puppies-4169955-hero-e45819b36836463e8919f58070eb5442.jpg',
          
            correct: ['Golden Retriever', 'Poodle'],
        },
        {
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_GeVwxNYIN3gw-a_YTBUhQfytpMGYpeX7TJTIeqMviz6SSpub67yHlwP5Ke9njdggkRjcIA&s',
           
            correct: ['Chihuahua', 'Dachshund'],
        },
        {
            image: 'https://www.purina.co.uk/sites/default/files/2022-07/Chug.jpg?itok=C_ctOIaz',
            
            correct: ['Chihuahua', 'Pug'],
        },
        {
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu-7O62_qLmJj32Y9Lto6BnkxkMNsLvXCGwtVdk-y98uGS6lB9B9JnAtmFDGM8uowvrc2Ij-WIQc58MoII70DEWDgoXBcC7JZ6j4yfYw&s=10',
            
            correct: ['Cavalier King Charles Spaniel', 'Poodle'],
        },
        {
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6F9ObK3ovSyIlrv9gpp3GprWM-pykFjg_3ymEl5F4UKQHMQxV2AtijBpAVPVqRJgCHn7pnc6ZIba3QIuETqad_mfdp5r39zJziyteB5U&s=10',
            
            correct: ['Maltese', 'Yorkshire Terrier'],
        },
        {
            image: 'https://cdn-fastly.petguide.com/media/2022/02/16/8219633/bullmatian.jpg?size=720x845&nocrop=1',
           
            correct: ['Bulldog', 'Dalmation'],
        },
        {
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3Q5Ak7edJxQ4HWzJTCjZm4ghNJabeJyBM8EuYpbNWtuO2U3tqPR5zCieLvO8Y7wbgPxn_6CAp9M_mmZrYdPvSgvHuj31aQNsGhusOpww&s=10',
            
            correct: ['Old English Sheepdog', 'Poodle'],
        },
        {
            image: 'https://preview.redd.it/a-gerberian-shepsky-a-mix-of-my-two-favorite-breeds-german-v0-kqx4vn9c4z6y.png?width=640&crop=smart&auto=webp&s=e1094c9646dc3af4fdcf1827d7ee5f299dab8aa6',
            
            correct: ['German Shepherd', 'Husky'],
        },
        {
            image: 'https://i.redd.it/et4451ah75x11.jpg',
            
            correct: ['Pitbull', 'Austrailian Cattle Dog'],
        },
       
            {
              image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPZlniG-5lY2UWGE0W2FCQfkcPTmWV2Wjbu4x8TroT4BgrfZ1SH2irze9cd7XefRdUSTuz6bCcdknydlTx8iAJpU2aPPuTKqoj7pdUwvg&s=10',
              correct: ['Beagle', 'Pug'], // Puggle
            },
            {
              image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt25Co31M4YqwDqpai2fh96sI-YLmEarqdHLwJK_ek8Fdgc0B8KwrSDO1z2nUFPD7yNuU0vlWK9b_sU4qCzxWzPu3SRjol-1fw1V1h-g&s=10',
              correct: ['Labrador Retriever', 'Poodle'], // Labradoodle
            },
            {
              image: 'https://i.pinimg.com/736x/06/c9/f0/06c9f043ee54aa3740ca23c847135090.jpg',
              correct: ['Rottweiler', 'Husky'],
            },
            {
              image: 'https://i.pinimg.com/736x/0a/9d/8a/0a9d8a65830de5ff1e8683683556bd9f.jpg',
              correct: ['Corgi', 'German Shepherd'],
            },
            {
              image: 'https://i.redd.it/adopted-him-7-years-ago-were-originally-told-he-is-boxer-v0-jwhhqiwdq03b1.png?width=864&format=png&auto=webp&s=5c53342981fa15242ae3b91efe0f42746fd3c60e',
              correct: ['Boxer', 'Labrador Retriever'],
            },
            {
              image: 'https://www.dogster.com/wp-content/uploads/2021/03/chiweeni-dog-sitting-outside_Jaclyn-Vernace_Shutterstock.jpg',
              correct: ['Chihuahua', 'Dachshund'],
            },
           
            {
              image: 'https://total.vet/wp-content/uploads/2022/10/The-Shih-Poo-A-Guide-to-The-Teddy-Bear-Dog.jpg',
              correct: ['Shih Tzu', 'Poodle'],
            },
            {
              image: 'https://i.shgcdn.com/fbe53dcf-35d0-4bc4-961a-604a4078ae8a/-/format/auto/-/preview/3000x3000/-/quality/lighter/',
              correct: ['Pitbull', 'Rottweiler'],
            },
            {
              image: 'https://images.ctfassets.net/nx3pzsky0bc9/4FzEiJP4EB8kN7fwwu8jhf/e123737636b5c0e3ae170e9ba26772b3/Aussiedoodle.png',
              correct: ['Australian Shepherd', 'Poodle'],
            },
            {
              image: 'https://external-preview.redd.it/husky-pomeranian-mix-v0--dck3tsBTsdDkNNrbSgoFXMsLqTFHVS271va77rysT0.png?auto=webp&s=7b680d3681046d7c0891e24514a233d5cd510cdb',
              correct: ['Pomeranian', 'Husky'],
            },
            {
              image: 'https://dogtime.com/wp-content/uploads/sites/12/2023/10/GettyImages-1321083270-e1696256621612.jpg?w=1024',
              correct: ['Golden Retriever', 'Husky'],
            },
            {
              image: 'https://pet-health-content-media.chewy.com/wp-content/uploads/2025/08/22022623/cockapoo.jpg',
              correct: ['Cocker Spaniel', 'Poodle'],
            },
            {
              image: 'https://cdn.shopify.com/s/files/1/0840/6049/files/0019_Why_Should_You_Want_One_of_These_Mixed_Breed_Dogs.jpg?v=1676748532',
              correct: ['Pitbull', 'Labrador Retriever'],
            },
            {
              image: 'https://cdn.shopify.com/s/files/1/0696/9265/3873/files/shutterstock_2197297347-1-700x467.webp?v=1672306696',
              correct: ['Border Collie', 'Husky'],
            },
            {
              image: 'https://i.ytimg.com/vi/mxtplWnVhE0/maxresdefault.jpg',
              correct: ['Dachshund', 'Poodle'],
            },
            {
              image: 'https://images.squarespace-cdn.com/content/v1/594974c0e58c62484cbd42f9/1601561010255-8ZDKHE3KFJTKCGU4TBEU/FRUG_reggie_thefrug.png',
              correct: ['French Bulldog', 'Pug'],
            },
            {
              image: 'https://huskygifts.com/wp-content/uploads/2023/01/Husky-Boxer-Mix-Exercise-1024x676.jpeg',
              correct: ['Boxer', 'Husky'],
            },
            {
              image: 'https://www.borrowmydoggy.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F4ij0poqn%2Fproduction%2F2d98951585919a4beb2f42e6e6e2aa1c16e7d22e-800x600.jpg&w=1080&q=80',
              correct: ['Cavalier King Charles Spaniel', 'Bichon Frise'],
            },
            {
              image: 'https://www.alphapaw.com/wp-content/uploads/2021/01/30077763_199411113996395_2109383534283063296_n-819x1024-1.jpg',
              correct: ['Rottweiler', 'Labrador Retriever'],
            },
          ]
          
        
    

          const hard = [
            {
              image: 'https://www.caninejournal.com/wp-content/uploads/Fluffy-Golden-Dog.jpg',
              correct: ['Golden Retriever', 'Labrador', 'Poodle'],
            },
            {
              image: 'https://i.redd.it/cd1aqkco58he1.jpeg',
              correct: ['Labrador', 'Poodle', 'German Shepherd'],
            },
            {
              image: '',
              correct: ['Springer Spaniel', 'Labrador', 'Cocker Spaniel'],
            },
            {
              image: 'https://shibleysmiles.com/wp-content/uploads/2023/06/poodle.webp',
              correct: ['Maltese', 'Poodle', 'Shih Tzu'],
            },
            {
              image: 'https://www.fpaat.com/media/ap_media/EAYCGFDMGNBP.jpg',
              correct: ['Yorkshire Terrier', 'Poodle', 'Bichon Frise'],
            },
            {
              image: 'https://live.staticflickr.com/4057/4257392896_42d7927a0c_b.jpg',
              correct: ['Pomeranian', 'Chihuahua', 'Papillon'],
            },
            {
              image: 'https://i.pinimg.com/564x/d1/dc/57/d1dc5777fdfc3d450feeb5e5c0061857.jpg',
              correct: ['Beagle', 'Labrador', 'Boxer'],
            },
            {
              image: 'https://paddockfarmdogs.co.uk/wp-content/uploads/2022/11/Photo-15-11-2022-09-45-21-2.jpg',
              correct: ['Cocker Spaniel', 'Poodle', 'Cavalier King Charles Spaniel'],
            },
            {
              image: 'https://i.pinimg.com/736x/e9/77/27/e977273db472c42d810438d4c3438d01.jpg',
              correct: ['Australian Shepherd', 'Labrador', 'Siberian Husky'],
            },
            {
              image: 'https://i.pinimg.com/736x/76/e5/f8/76e5f817837c8684c1f05eba252be4ad.jpg',
              correct: ['German Shepherd', 'Siberian Husky', 'Belgian Malinois'],
            },
            
            {
              image: 'https://dogtime.com/wp-content/uploads/sites/12/gallery/german-shepherd-rottweiler-mixed-dog-breed-pictures/german-shepherd-rottweiler-mixed-dog-breed-pictures-1.jpg',
              correct: ['Rottweiler', 'German Shepherd'],
            },
            {
              image: 'https://i.pinimg.com/474x/33/ef/61/33ef613fa00479c5ba95cb8b7b7f4557.jpg',
              correct: ['Schnauzer', 'West Highland Terrier'],
            },
            {
              image: 'https://i.pinimg.com/474x/a4/74/34/a474343fb0ff359cf7c2984b2cc0d541.jpg',
              correct: ['Jack Russell', 'Maltese', 'Beagle'],
            },
            {
              image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrXAImNWo_3zLccOEuyXToWtX7eRz0fp93rw&s',
              correct: ['Cairn Terrier', 'West Highland Terrier'],
            },
            {
              image: 'https://i.redd.it/7sphduzt6wme1.jpeg',
              correct: ['Dachshund', 'Beagle', 'Chihuahua'],
            },
            {
              image: 'https://dogsofsf.com/wp-content/uploads/2025/10/IMG_0377-scaled.jpeg',
              correct: ['Husky', 'German Shepherd', 'Malamute'],
            },
            {
              image: 'https://www.naturepl.com/cache/pcache2/01482276.jpg',
              correct: ['Bichon Frise', 'Cavalier King Charles Spaniel'],
            },
            {
              image: 'https://s.yimg.com/os/en/pethelpful_915/c3d5f27a73e329fc9166e9c30e9b8ce9',
              correct: ['Golden Retriever', 'Bernese Mountain Dog'],
            },
            {
              image: 'https://www.thefamilypuppy.com/media/ap_media/HGARXNAOTZAH.jpg',
              correct: ['Boxer', 'Bulldog', 'Mastiff'],
            },
            {
              image: 'https://articles.hepper.com/wp-content/uploads/2021/11/Shinese-mixed-breed-dog.jpg',
              correct: ['Shih Tzu', 'Pekingese'],
            },
            {
              image: 'https://i.redd.it/piyf4hjib64a1.jpg',
              correct: ['Australian Shepherd', 'Border Collie', 'Golden Retriever'],
            },
            {
              image: 'https://i.pinimg.com/736x/94/6a/c0/946ac05fec9c0c60d79e58d7019ff401.jpg',
              correct: ['Doberman', 'Rottweiler', 'German Shepherd'],
            },
            {
              image: 'https://i.redd.it/i-was-told-he-was-a-pomeranian-yorkie-shih-tzu-mix-what-do-v0-xdwgwg9n7vyc1.jpg?width=3024&format=pjpg&auto=webp&s=c96206e8600df1c0b332ae1e7384a7220191355d',
              correct: ['Pomeranian', 'Shih Tzu', 'Yorkshire Terrier'],
            },
            {
              image: 'https://articles.hepper.com/wp-content/uploads/2019/11/Aussie-Corgi-Australian-Shepherd-x-Corgi-dog-sitting-on-a-couch_Aggie2022_Shutterstock.jpg',
              correct: ['Corgi', 'Australian Shepherd', 'Border Collie'],
            },
          ];

    const superHard =[...easy, ...medium, ...hard]
    const [easyLevelDogs, setEasyLevelDogs] = useState(() => pickEasyDogs(easy, 12))

    const [mediumLevelDogs, setMediumLevelDogs] = useState(()=>pickMediumDogs(medium, 12))
    const [hardLevelDogs, setHardLevelDogs] = useState(()=>pickHardDogs(hard, 12))

    const [superHardLevelDogs, setSuperHardLevelDogs] = useState(()=>pickSuperHardDogs(superHard, 12))
   
   

 

    function reset(){
        setQuestion(1)
        setCorrect(null)
        setLevel(1)
        setLives(3)
        setDogChoices([])
        setGameOver(false)
        setYouWin(false)
        setSelected([])
        setScore(0)
        setMessage(null)
        setShowMessage(false)
        setStart(true)
        setAlertHighScore(false)
        setNewHighScore(0)
    }
   

      function pickEasyDogs(easy, count = 11){
        return [...easy]
        .sort(() => Math.random() - 0.5)
        .slice(0, count)
      }

      function pickMediumDogs(medium, count = 12){
        return [...medium]
        .sort(() => Math.random() - 0.5)
        .slice(0, count)
      }
      function pickHardDogs(hard, count = 12){
        return [...hard]
        .sort(() => Math.random() - 0.5)
        .slice(0, count)
      }

      function pickSuperHardDogs(superHard, count = 12){
        return [...superHard]
        .sort(() => Math.random() - 0.5)
        .slice(0, count)
      }


    
    const currentDog = level <= 3?
       easyLevelDogs[easyIndex] :
       level > 3 && level <= 6 ?
      mediumLevelDogs[mediumIndex] :
      level > 6 && level <=9 ?
      hardLevelDogs[hardIndex] :
      superHardLevelDogs[superHardIndex]
    
      useEffect(()=>{
        if(score > highScore && alertHighScore == false){
          setAlertHighScore(true)
          setMessage('new high schore!')
        }
        if(score > newHighScore){
          setNewHighScore(score)
        }
      }, [score])

      useEffect(() => {

        if(!currentDog) return
        const filtered = choices.filter(c=> !currentDog.correct.includes(c))
        const indices = new Set()
      
        while (indices.size < 3) {
          indices.add(Math.floor(Math.random() * filtered.length))
        }
        const arr = [...indices].map(i => filtered[i])
        currentDog.correct.forEach(answer => {
            const insertIndex = Math.floor(Math.random() *( arr.length +1))
            arr.splice(insertIndex,0,answer)
        })
       
       
        setDogChoices(arr)
        if(lives.length == 0){
            setGameOver(true)
        }
        
      }, [question, level])
    
   
      function select(x){
      setSelected(prev=> 
        prev.includes(x)
        ? prev.filter(c=> c !== x)
        : [...prev, x])
        

      }

      useEffect(()=>{
        console.log(start)
        setTimer(10)
        if(gameOver || nextLevel || start || youWin) return
        
        const countDown = setInterval(()=>{
            
            setTimer(prev => {
                if(prev <= 1){
                    clearInterval(countDown)
                    nextQuestion()
                    return 0
                }
                
                return prev-1
            })
        }, 1000)
    
        
        return () => clearInterval(countDown)
    
      }, [question, nextLevel, gameOver, start])

    
      function nextQuestion() {
        
        const sortedSelected = [...selected].sort();
        const sortedCorrect = [...currentDog.correct].sort();
      
      
      
        const isMatch = sortedSelected.every((v, i) => v === sortedCorrect[i]) && sortedSelected.length == sortedCorrect.length

        let newLives = lives
      
        if (isMatch) {
          
            if(timer > 8){
          setScore(score + 20);
          setMessage(`Speed Bonus!
            +20`)
        }else if(timer >5 && timer<9){
            setScore(score + 15);
          setMessage('+15')
        }
        else if(timer >3 && timer<6){
            setScore(score + 10);
          setMessage('+10')
        }else{
            setScore(score + 5);
            setMessage(`Knick of time!`)
            
        }
          
          setShowMessage(true)
          
        } else {
           
            setLives(prev => prev.slice(0, -1))
          
          setMessage('❌')
          setShowMessage(true)
        
            }
    
            if(newLives <=0){
                setGameOver(true)
                return
            }
       

      
        
setTimeout(()=>{
    const nextQ = question +1
    if(level <= 3) setEasyIndex(prev=> prev + 1)
    if(level > 3 && level <= 6) setMediumIndex(prev=> prev + 1)
      if(level > 6 && level <= 9) setHardIndex(prev=> prev + 1)
        if(level > 9) setSuperHardIndex(prev=> prev + 1)
    setSelected([])
    setShowMessage(false)
    setMessage(null)
    if (nextQ % 3 == 0){
        setNextLevel(true)
        setTimer(10)
    }
        setQuestion(nextQ)
    
}, 800)    
   
       
        
       
      }

      function goToNextLevel(){
        if(level === 12){
          setNextLevel(false)
          setYouWin(true)
          return
        }
        setLevel(prev => {
         
          if (prev === 3) setMediumIndex(0)
          if(prev === 6) setHardIndex(0)
          if(prev === 9) setSuperHardIndex(0)
            return prev + 1
        })
        setNextLevel(false)
        


      }
      
   
useEffect(() =>{
    console.log(gameOver, lives, score, timer, nextLevel)
}, [])
    
    
  return (
    <Container fluid className='playingField justify-content-center d-flex flex-column align-items-center p-0'>
      
       
    {gameOver == true || youWin == true ?
    <GameOver score={score} reset = {reset} youWin={youWin} setYouWin={setYouWin} />
:
nextLevel == true && !youWin ?
<NextLevel score ={score} goToNextLevel={goToNextLevel} level={level}  />
:
         
         <>
         {showMessage ? 
         <h1 className='message p-2 rounded bg-white shadow'>{message}</h1>
         : ''}
        
      <Row className='gameInfo  shadow w-100 mb-4 py-1 px-4'>
        <div className='d-flex justify-content-between flex-row'>
        <h5>Level: {level}</h5>
        <h5>Lives: {lives.join('')}</h5>
       <h5>My Score: {score} </h5> 
       <h5>High Score: {score > highScore ? newHighScore : highScore}</h5>
       </div>
      </Row>
      
      
      <div className='d-flex flex-column timer-container p-2 my-4 align-items-center justify-content-center w-25'>
      <h3>{timer}</h3> 
       <ProgressBar  animated now={timer} max={10} className='w-100' variant={timer > 8 ? 'success' : timer > 5 && timer < 9 ? 'info' : timer > 3 && timer < 6 ? 'warning' : 'danger'} />
       
        </div>
      
     

        <Row className='playing d-flex'>
        
        <div className='dogContainer d-flex align-items-center justify-content-center mb-5'>
            <img src={currentDog.image} className='dogPic'/>
        </div>
        
      <div className='choices d-flex flex-column p-2 justify-content-center align-items-center'>
      {dogChoices.map(choice=>
        <Badge key={choice} bg={selected.includes(choice) ? 'primary' : 'secondary'} onClick={()=>select(choice)}className='my-2 dogChoices p-2 w-50'>{choice}</Badge>
      )}
      <Button className='w-50 mt-3' onClick={nextQuestion}>🐾 Submit</Button>
      </div>
      
      
      </Row>
      
      </>
        }


    </Container>
  )
}

export default Play
