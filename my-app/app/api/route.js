import { ConnectDB } from "@/lib/config/db";
import TodoModel from "@/lib/models/TodoModel";
import { NextResponse } from "next/server";

// Connect to the database once when the server starts
const LoadDB = async () => {
    try {
        await ConnectDB();
        console.log("Database connected.");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
};

LoadDB();

// Handle GET request
export async function GET(request) {
    const todos = await TodoModel.find({});
    return NextResponse.json({todos:todos})
}

// Handle POST request
export async function POST(request) {
    try {
        const { title, description } = await request.json();

        if (!title || !description) {
            return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
        }

        const newTodo = await TodoModel.create({ title, description });

        return NextResponse.json({ msg: "Todo created", data: newTodo }, { status: 201 });
    } catch (error) {
        console.error("Error creating todo:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(request){
    const mongoId =  await request.nextUrl.searchParams.get('mongoId');
    await TodoModel.findByIdAndDelete(mongoId);
    return NextResponse.json({msg:"Todo Deleted"})
}

export async function PUT(request){
    const mongoId =  await request.nextUrl.searchParams.get('mongoId');
    await TodoModel.findByIdAndUpdate(mongoId,{
        $set :{
            isCompleted:true
        }
    });
    return NextResponse.json({msg:"Todo Updated"})
}