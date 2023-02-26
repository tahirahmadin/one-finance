import Head from "next/head";
import Seo from "../common/Seo";

const FAQPage = () => {
  return (
    <>
    <Seo
        title="FAQ | OneRare Foodverse"
        description="OneRare is the World’s First Metaverse for the Global Food & Beverage Industry. Play Food NFT Games, Enjoy Virtual Restaurant Experiences & Swap NFTs for Real Meals."
        keywords="onerare faq, faq metaverse, faq foodverse, leadership metaverse, onerare faq, nft game, metaverse game, game nft, nft metaverse, nft blockchain, metaverse blockchain, food metaverse, foodverse, food game, nft food, metaverse food game"
        image="https://1499377728-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-MkXfxALyD8sO44Y1OrY%2Fuploads%2FQvX3Uc0Ek5QPRRZIUMK2%2FUntitled%20design%20(3).gif?alt=media&token=eb3bd406-f66b-4738-9428-3dd8d8ed97fe"
      />
      <Head>
        <title>How To Play | OneRare Foodverse</title>
        <meta name="description" content="How To Play | OneRare Foodverse" />
        <meta property="og:type" content="website" />
        <meta
          name="og:title"
          property="og:title"
          content="How To Play | OneRare Foodverse"
        />
        <meta
          name="og:description"
          property="og:description"
          content="OneRare celebrates Dishes from across the world and every Dish has a
          Recipe - a Set of Ingredients needed to claim the Dish NFT. Traverse
          our Foodverse to collect Ingredients from the Farm & Farmer's
          Market. Once you have them all, head to the Kitchen and “cook” up
          your Dish !"
        />
        <meta property="og:site_name" content="OneRare" />
        <meta property="og:url" content="https://play.onerare.io/" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="" />
        <meta
          name="twitter:description"
          content="OneRare celebrates Dishes from across the world and every Dish has a
          Recipe - a Set of Ingredients needed to claim the Dish NFT. Traverse
          our Foodverse to collect Ingredients from the Farm & Farmer's
          Market. Once you have them all, head to the Kitchen and “cook” up
          your Dish !"
        />
        <meta name="twitter:site" content="" />
        <meta name="twitter:creator" content="" />
        <link rel="icon" type="image/png" href="/static/images/favicon.ico" />
        <link rel="apple-touch-icon" href="/static/images/favicon.ico" />
        <link rel="stylesheet" href="" />
        <meta property="og:image" content="images/OneRare_BG.jpg" />
        <meta name="twitter:image" content="images/OneRare_BG.jpg" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="htp">
        <div className="htp_tips">
          <img
            src="https://onerare-bucket.s3.ap-south-1.amazonaws.com/assets/images/htp_bg.svg"
            alt=""
            className="htp_tips_bg"
            loading="lazy"
          />
          <div className="htp_container">
            <h1 className="htp_title">Frequently Asked Questions</h1>
            <div>
              <p className="htp_title_main">GETTING STARTED</p>
              <p className="htp_question">
                Q. What Chain is OneRare built on ?
              </p>
              <p className="htp_description">
                A. OneRare & $ORARE Token are native to Polygon Chain. Please
                ensure you have your Metamask Wallet to connect to the
                Foodverse.
              </p>
            </div>
            <div className="mt-5">
              <p className="htp_title_main">FARM</p>
              <p className="htp_question">
                Q. Do I have to lock my Tokens for a fixed period in the Farm ?
              </p>
              <p className="htp_description">
                A. You can stake and unstake your $ORARE token from the Farm at
                any time. Your NFT Rewards will be calculated as per the time
                staked in the Pool.
              </p>

              <p className="htp_question">
                Q. How do I choose the Staking Pool ? Is one pool better than
                another ?
              </p>
              <p className="htp_description">
                A. Choose your Pool depending on the Dish you want to mint. If
                you are minting a recipe with many vegetables, you can stake at
                Farm Fresh. If you wish to make a dairy-intensive dish, then
                Sunshine Dairy would be better for you. If you don’t have a
                recipe in mind and would like to mint as many Ingredients as
                possible, check the Pool marked as ★YIELD in the Farm. This Pool
                is identified as the top reward-yielding pool based on current
                conditions.
              </p>

              <p className="htp_question">
                Q. Can I farm for a Specific Ingredient NFT ?
              </p>
              <p className="htp_description">
                A. No, you cannot farm for a specific Ingredient. Each Farm Pool
                has a Theme and a list of ingredients. When you stake in the
                pool, you become eligible for receiving a randomised NFT from
                the Pool. If you wish to procure a specific NFT, shopping at the
                Farmer’s Market will be better and faster for you.
              </p>
            </div>
            <div className="mt-5">
              <p className="htp_title_main">FARMER’S MARKET</p>
              <p className="htp_question">
                Q. Should I mint a Dish in the Kitchen or Buy it from the Farmer
                Market?
              </p>
              <p className="htp_description">
                A. Every Dish has a Recipe - a set of Ingredients needed to make
                the Dish. As a player, you can evaluate the cost of collecting
                ingredients versus the cost of buying a dish directly from the
                market. You can use the Magic Buy button in the Kitchen to help
                you check the total cost of Ingredients required by the Recipe.
                If the cost is less than the price of the listed Dish, you
                should proceed with buying the Ingredients. If a Dish is listed
                at a lower cost than the Magic Buy shopping total, you should
                buy it directly from the market.
              </p>

              <p className="htp_question">
                Q. Who decides the price of the Ingredients & Dishes in the
                Farmer Market?
              </p>
              <p className="htp_description">
                A. Farmers have the right to decide the price of their produce
                in the Farmer’s Market. Use your Dashboard to put your
                Ingredient / Dish NFTs on sale and set their price. Ofcourse
                keep the market conditions in mind, and see how your competition
                is doing. Cheaper produce will sell faster !
              </p>
            </div>

            <div className="mt-5">
              <p className="htp_title_main">KITCHEN</p>
              <p className="htp_question">
                Q. I have the Ingredients listed in the Recipe, but the Cook
                Option is not working ?
              </p>
              <p className="htp_description">
                A. Every Dish has a fixed recipe set by OneRare - you must
                follow this recipe to claim the Dish. The “Cook” action will
                only work if you have the correct Ingredients in your wallet. If
                you do not possess adequate Ingredients in your wallet, the
                transaction will error. Check if the Dish has not been minted by
                another player, causing the minting difficulty to go up.
              </p>

              <p className="htp_question">
                Q. Why do the Ingredients required for a Dish keep increasing ?
              </p>
              <p className="htp_description">
                A. OneRare Dishes are minted on a curve. With each mint, the
                number of Ingredients required for a Dish will go up
                exponentially. For the first mint, you will need to collect 1 of
                each Ingredient. For the second mint, you will need to collect 3
                of each Ingredient, and so on. Massive early-mover advantage to
                make your Dish fast, and see it’s value go up as others struggle
                with higher ingredient costs.
              </p>

              <p className="htp_question">
                Q. Can I reverse my Dish NFT back into individual Ingredient
                NFTs ?
              </p>
              <p className="htp_description">
                If you have correctly collected all Ingredients needed for your
                Dish to cook/mint, the Smart Contract will extract the
                Ingredients from your Metamask wallet, burn the NFTS, and
                deliver the Dish NFT to your wallet. This is an irreversible
                transaction - just like you cannot reverse your food at home to
                become raw ingredients again !
              </p>
              <p className="htp_question">
                Q. How many Dishes will be featured on OneRare ?
              </p>
              <p className="htp_description">
                Just like our unlimited love for Food, OneRare’s kitchen will
                keep churning out Dishes from all across the world. Every week,
                we release 15 new Recipes so that our Foodies have new recipes
                to mint everyday.
              </p>
              <p className="htp_question">
                Q. What do I do with my Dish NFTs ?
              </p>
              <p className="htp_description">
                You will be able to use these Dishes to run your own Foodtruck
                in our Playground. We are releasing the first game in our
                Playground, Foodtruck Wars, which is a three-player strategy
                game. While we wait to release the details, the only hint we can
                give you is to make a LOT of Dishes and try to get as many
                diverse cuisines in your wallet as possible.
              </p>
            </div>
            <div className="mt-5">
              <p className="htp_title_main">LEADERBOARD</p>
              <p className="htp_question">
                Q. How are the Points on the Leaderboard calculated?
              </p>
              <p className="htp_description">
                A. We follow the below frame to calculate your points. 1 point
                for each Ingredient that you own + 500 points for each Dish that
                you own. For example, if you have 1000 Ingredients and 3 Dishes
                = Your total point will be 2500.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQPage;
