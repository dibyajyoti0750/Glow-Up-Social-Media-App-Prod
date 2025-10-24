import { Inngest } from "inngest";
import User from "../models/User.js";
import Connection from "../models/Connection.js";
import sendEmail from "../config/nodeMailer.js";
import Story from "../models/Story.js";

export const inngest = new Inngest({ id: "glowup" });

const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;

    let username = email_addresses[0].email_address.split("@")[0];

    // Check username availability
    let user = await User.findOne({ username });

    if (user) {
      username = username + Math.floor(Math.random() * 1000);
    }

    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      full_name: [first_name, last_name].filter(Boolean).join(" "),
      profile_picture: image_url,
      username,
    };

    await User.create(userData);
  }
);

const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;

    const updateUserData = {
      email: email_addresses[0].email_address,
      full_name: [first_name, last_name].filter(Boolean).join(" "),
      profile_picture: image_url,
    };

    await User.findByIdAndUpdate(id, updateUserData);
  }
);

const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    await User.findByIdAndDelete(id);
  }
);

// Send reminder when a new connection request is added
const sendNewConnectionRequestReminder = inngest.createFunction(
  { id: "send-new-connection-request-reminder" },
  { event: "app/connection-request" },
  async ({ event, step }) => {
    const { connectionId } = event.data;

    await step.run("send-connection-request-mail", async () => {
      const connection = await Connection.findById(connectionId).populate(
        "from_user_id to_user_id"
      );

      const subject = `You've got a new connection request from ${connection.from_user_id.full_name}`;
      const body = `<!DOCTYPE html>
      <html>
        <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 30px;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden;">

            <!-- Header -->
            <div style="background-color: #1a73e8; padding: 20px; text-align: center;">
              <h2 style="color: #ffffff; margin: 0; font-size: 22px;">Glow Up</h2>
            </div>

            <!-- Body -->
            <div style="padding: 25px;">
              <p style="font-size: 16px; color: #333; margin-top: 0;">Hi ${
                connection.to_user_id.full_name
              },</p>

              <p style="font-size: 15px; color: #555; line-height: 1.6;">
                <strong>${
                  connection.from_user_id.full_name
                }</strong> has sent you a connection request on <strong>Glow Up</strong>.
              </p>

              <p style="font-size: 15px; color: #555; line-height: 1.6;">
                You can view their profile or respond to the request using the button below.
              </p>

              <!-- CTA Button -->
              <p style="text-align: center; margin-top: 30px;">
                <a href="${process.env.FRONTEND_URL}/connections" 
                  style="background-color: #1a73e8; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-size: 15px; display: inline-block;">
                  View Connection Request
                </a>
              </p>

              <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

              <p style="font-size: 13px; color: #999; text-align: center; line-height: 1.5;">
                You're receiving this email because you have a registered account on <strong>Glow Up</strong>.<br>
                © ${new Date().getFullYear()} Glow Up. All rights reserved.
              </p>
            </div>
          </div>
        </body>
      </html>
      `;

      await sendEmail({ to: connection.to_user_id.email, subject, body });
    });

    const in24Hours = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await step.sleepUntil("wait-for-24-hours", in24Hours);

    await step.run("send-connection-request-reminder", async () => {
      const connection = await Connection.findById(connectionId).populate(
        "from_user_id to_user_id"
      );

      if (connection.status === "accepted") {
        return { message: "Already accepted" };
      }

      const subject = `You've got a new connection request from ${connection.from_user_id.full_name}`;
      const body = `<!DOCTYPE html>
      <html>
        <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 30px;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden;">

            <!-- Header -->
            <div style="background-color: #1a73e8; padding: 20px; text-align: center;">
              <h2 style="color: #ffffff; margin: 0; font-size: 22px;">Glow Up</h2>
            </div>

            <!-- Body -->
            <div style="padding: 25px;">
              <p style="font-size: 16px; color: #333; margin-top: 0;">Hi ${
                connection.to_user_id.full_name
              },</p>

              <p style="font-size: 15px; color: #555; line-height: 1.6;">
                <strong>${
                  connection.from_user_id.full_name
                }</strong> has sent you a connection request on <strong>Glow Up</strong>.
              </p>

              <p style="font-size: 15px; color: #555; line-height: 1.6;">
                You can view their profile or respond to the request using the button below.
              </p>

              <!-- CTA Button -->
              <p style="text-align: center; margin-top: 30px;">
                <a href="${process.env.FRONTEND_URL}/connections" 
                  style="background-color: #1a73e8; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-size: 15px; display: inline-block;">
                  View Connection Request
                </a>
              </p>

              <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

              <p style="font-size: 13px; color: #999; text-align: center; line-height: 1.5;">
                You're receiving this email because you have a registered account on <strong>Glow Up</strong>.<br>
                © ${new Date().getFullYear()} Glow Up. All rights reserved.
              </p>
            </div>
          </div>
        </body>
      </html>
      `;

      await sendEmail({ to: connection.to_user_id.email, subject, body });

      return { message: "Reminder sent." };
    });
  }
);

// Inngest function to delete a story after 24 hours
const deleteStory = inngest.createFunction(
  { id: "story-delete" },
  { event: "app/story.delete" },
  async ({ event, step }) => {
    const { storyId } = event.data;
    const in24Hours = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await step.sleepUntil("wait-for-24-hours", in24Hours);
    await step.run("delete-story", async () => {
      await Story.findByIdAndDelete(storyId);
      return { message: "Story deleted." };
    });
  }
);

export const functions = [
  syncUserCreation,
  syncUserUpdation,
  syncUserDeletion,
  sendNewConnectionRequestReminder,
  deleteStory,
];
