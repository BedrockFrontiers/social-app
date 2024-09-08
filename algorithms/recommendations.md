# Tidal Recommendation Algorithm

## Introduction

The Tidal recommendation algorithm is inspired by similar systems used in modern social media platforms, such as Twitter. It is designed to provide a personalized and relevant feed of content to each user by analyzing a variety of signals based on their behavior, network interactions, and overall platform trends. This document provides a detailed explanation of the inner workings of the algorithm and the logic that drives content recommendation in Tidal.

## Key Principles

The Tidal recommendation algorithm operates on several core principles:

1. **User Engagement:** The algorithm prioritizes content that users have previously interacted with, ensuring that content similar to what they have liked, replied to, or shared appears more frequently.
   
2. **Social Network Influence:** Content that is actively engaged by the user’s network of friends or followers is given additional weight in the recommendation process.

3. **Global Popularity:** Popular content across the entire platform is considered, ensuring that trending posts can surface even to users who may not have interacted with similar posts in the past.

4. **Recency:** Recent posts are weighted to ensure the feed stays fresh with new content, rather than just highly engaging but older posts.

5. **Topic Similarity:** Content similar to the user’s past interactions in terms of hashtags, topics, or keywords receives a higher recommendation score.

## Signals and Weighting System

To ensure high-quality recommendations, the algorithm evaluates a set of signals. Each signal is assigned a specific weight, which contributes to the final recommendation score of each post. Below is a breakdown of the key signals:

### 1. **Direct User Engagement (50%)**
   - Tweets that the user has directly interacted with receive the highest priority.
   - Engagement types include likes, retweets, replies, and shares.
   - **Formula:**
     $Direct Engagement Score$ = $InteractionType$ $\times 0.5$
     
     The different interaction types can be weighted according to their importance. For example:
     - Likes: 0.2
     - Replies: 0.3
     - Reposts: 0.4

#### Example

```py
def calculate_direct_engagement(interaction_type: str) -> float:
    weights: Dict[str, float] = {"like": 0.2, "reply": 0.3, "retweet": 0.4}
    return weights.get(interaction_type, 0) * 0.5
```

### 2. **Network Engagement (30%)**
   - Content that is engaged by people the user follows.
   - This signal increases the relevance of posts based on the user’s network activity.
   - **Formula:**
     	$Network Engagement Score$ = $Engaged Friends Count$ $\times 0.3$
     
     For every friend that engages with a post, the score increases. The more friends interact, the higher the score.

#### Example

```py
def calculate_network_engagement(friend_engagement_count: float) -> float:
    return friend_engagement_count * 0.3
```

### 3. **Global Popularity (10%)**

   - Popular posts across the entire platform receive additional weight.
   - This ensures that trending topics and viral content appear in the user’s feed, even if the user or their direct network hasn't interacted with it yet.
   - **Formula:**  
     $Global Popularity Score$ = $\frac{Total Engagement}{Total Users}$ $\times 0.1$

#### Example

```py
def calculate_global_popularity(total_engagements: float, total_users: float) -> float:
    return (total_engagements / total_users) * 0.1
```

### 4. **Recency (10%)**
   - The age of the post plays a role in determining how relevant it is. More recent posts are given a higher priority to keep the user’s feed fresh.
   - **Formula:**  
     	$Recency Score$ = $\frac{24 - Hours Since Posted}{24}$ $\times 0.1$

#### Example

```py
def calculate_recency(hours_since_posted: int) -> float:
    return ((24 - hours_since_posted) / 24) * 0.1
```

### Example Score Calculation

For a given post, the final score would be calculated as:

$Final Score$ = $(Direct Engagement Score)$ + $(Network Engagement Score)$ + $(Global Popularity Score)$ + $(Recency Score)$

### 5. **Content Similarity (Optional)**
   - In future versions, content similarity based on hashtags, keywords, and topics can be factored in. This would involve comparing the content of new posts with the content the user has interacted with in the past.

#### Example

```py
def calculate_final_score(interaction_type: str, friends_engaged: float, total_engagements: int, total_users: int, hours_since_posted: int) -> float:
    direct_engagement: float = calculate_direct_engagement(interaction_type)
    network_engagement: float = calculate_network_engagement(friends_engaged)
    global_popularity: float = calculate_global_popularity(total_engagements, total_users)
    recency: float = calculate_recency(hours_since_posted)
    
    return direct_engagement + network_engagement + global_popularity + recency
```

## Post Ranking

Once each post is assigned a score based on the formula above, the posts are ranked from highest to lowest. The posts with the highest scores are considered the most relevant and are shown at the top of the user’s feed.

### Normalization

To ensure fairness across the platform, the scores are normalized to fit within a specific range (e.g., 0 to 1 or 0 to 100). This ensures that the system can handle a variety of input sizes and engagement levels consistently.

#### Example

```py
def normalize_score(raw_score: float, max_possible_score: float) -> float:
    return raw_score / max_possible_score
```

## Scalability Considerations

The algorithm is designed to scale as the number of users and posts grows. Some strategies to ensure scalability include:
- **Batch Processing:** Evaluate posts in batches rather than in real-time to save on computational resources.
- **Caching Popular Content:** Frequently engaged posts can be cached and reused in recommendations, reducing computation time.
- **Distributed Systems:** As user interaction grows, the system can distribute the recommendation workload across multiple servers or nodes.

## Future Enhancements

- **Machine Learning Integration:** Over time, machine learning models can be integrated to automatically adjust weights based on user behavior, improving the accuracy of recommendations.
- **Real-Time Feedback:** Implement real-time adjustments based on the user’s immediate actions (e.g., scrolling past a post without engaging might decrease its relevance score).

## Conclusion

The Tidal recommendation algorithm uses a combination of engagement signals, social network interactions, platform-wide trends, and post recency to curate a highly personalized feed for each user. By continuously refining these signals and introducing advanced techniques like machine learning, the system can adapt to the evolving needs of the user base, delivering a dynamic and engaging social media experience.
