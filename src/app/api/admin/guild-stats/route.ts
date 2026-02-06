import { NextResponse } from "next/server";

export async function GET() {
  const guildId = process.env.DISCORD_GUILD_ID!;
  const botToken = process.env.DISCORD_BOT_TOKEN!;

  const res = await fetch(
    `https://discord.com/api/v10/guilds/${guildId}?with_counts=true`,
    {
      headers: {
        Authorization: `Bot ${botToken}`,
      },
    },
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch guild stats" },
      { status: 500 },
    );
  }

  const data = await res.json();

  return NextResponse.json({
    totalMembers: data.approximate_member_count,
    onlineMembers: data.approximate_presence_count,
  });
}
