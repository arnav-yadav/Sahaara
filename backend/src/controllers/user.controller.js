import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";

export async function getRecommendedUsers(req,res) {
    
    try {
        const currentUserId = req.user.id;
        const currentUser = req.user;

        const recommendedUsers = await User.find({
            $and: [
                { _id: { $ne: currentUserId } }, // Exclude self
                { _id: { $nin: currentUser.friends } }, // Exclude existing friends
                { isOnboarded: true } // Only include onboarded users
            ]
        })
        res.status(200).json(recommendedUsers);
    } catch (error) {
        console.error("Error fetching recommended users:", error);
        res.status(500).json({ message: "Internal Server error" });
    }
}

export async function getMyFriends(req,res) {
    try {
        const user = await User.findById(req.user.id)
        .select("friends")
        .populate("friends", "fullName profilePic canSupport needSupport");

        res.status(200).json(user.friends);
    } catch (error) {
        console.error("Error fetching MyFriends:", error);
        res.status(500).json({ message: "Internal Server error" });
    }
}

export async function sendFriendRequest(req,res) {
    try {
        const myId = req.user.id;
        const {id: recipientId} = req.params;

        //Prevent sending request to self
        if(myId === recipientId) {
            return res.status(400).json({message: "Cannot send friend request to yourself"});
        }

        const recipient = await User.findById(recipientId);
        if(!recipient) {
            return res.status(404).json({message: "Recipient user not found"});
        }
        
        // Check if a friend request already exists
        if(recipient.friends.includes(myId)) {
            return res.status(400).json({message: "You are already friends with this user"});
        }

        //Check if a friend request is already sent
        const existingRequest = await FriendRequest.findOne({
            $or:[
                {sender: myId, recipient: recipientId},
                {sender: recipientId, recipient: myId}
            ]
        })

        if (existingRequest) {
            return res.status(400).json({message: "A friend request already exists between you and this user"});
        }

        // Create new friend request
        const friendRequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientId
        });

        res.status(201).json({message: "Friend request sent successfully", friendRequest});

    } catch (error) {
        console.error("Error sending friend request:", error);
        res.status(500).json({ message: "Internal Server error" });
    }
}

export async function acceptFriendRequest(req,res) {
    try {
        const {id: requestId} = req.params;
        
        const friendRequest = await FriendRequest.findById(requestId);

        if(!friendRequest) {
            return res.status(404).json({message: "Friend request not found"});
        }

        //Verify if the logged in user is the recipient
        if(friendRequest.recipient.toString() !== req.user.id) {
            return res.status(403).json({message: "You are not authorized to accept this friend request"});
        }

        // Accept friend request
        friendRequest.status = "accepted";
        await friendRequest.save();


        // Update both users' friends lists
        await User.findByIdAndUpdate(friendRequest.sender, {
            $addToSet: { friends: friendRequest.recipient }
        })
        await User.findByIdAndUpdate(friendRequest.recipient, {
            $addToSet: { friends: friendRequest.sender }
        })

        res.status(200).json({message: "Friend request accepted successfully"});

    } catch (error) {
        console.error("Error accepting friend request:", error);
        res.status(500).json({ message: "Internal Server error" });
    }
}

export async function getFriendRequests(req,res) {
    try {
        const incomingReqs = await FriendRequest.find({
            recipient: req.user.id,
            status: "pending"
        }).populate("sender", "fullName profilePic canSupport needSupport");

        const acceptedReqs = await FriendRequest.find({
            sender: req.user.id,
            status: "accepted"
        }).populate("recipient", "fullName profilePic=");

        res.status(200).json({incomingReqs, acceptedReqs});
    } catch (error) {
        console.error("Error fetching friend requests:", error);
        res.status(500).json({ message: "Internal Server error" });
    }
}

export async function getOutgoingFriendRequests(req,res) {
    try {
        const outgoingReq = await FriendRequest.find({
            sender: req.user.id,
            status: "pending"
        }).populate("recipient", "fullName profilePic canSupport needSupport");
        
        res.status(200).json(outgoingReq);
    } catch (error) {
        console.error("Error fetching outgoing friend requests:", error);
        res.status(500).json({ message: "Internal Server error" });
    }
}