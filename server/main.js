import { Meteor } from 'meteor/meteor';
import { LinksCollection } from '/imports/api/links';
import { Accounts } from 'meteor/accounts-base';
import { Todos } from '../imports/api/todos';

async function insertLink({ title, url }) {
  await LinksCollection.insertAsync({ title, url, createdAt: new Date() });
}

Meteor.startup(async () => {
  // If the Links collection is empty, add some data.
  if (await LinksCollection.find().countAsync() === 0) {
    await insertLink({
      title: 'Do the Tutorial',
      url: 'https://www.meteor.com/tutorials/react/creating-an-app',
    });

    await insertLink({
      title: 'Follow the Guide',
      url: 'https://guide.meteor.com',
    });

    await insertLink({
      title: 'Read the Docs',
      url: 'https://docs.meteor.com',
    });

    await insertLink({
      title: 'Discussions',
      url: 'https://forums.meteor.com',
    });
  }

  // We publish the entire Links collection to all clients.
  // In order to be fetched in real-time to the clients
  Meteor.publish("links", function () {
    return LinksCollection.find();
  });

  // Create a test user if it doesn't exist
  try {
    const existingUser = Accounts.findUserByUsername('test');
    if (!existingUser) {
      console.log('Creating test user...');
      const userId = Accounts.createUser({
        username: 'test',
        password: 'password',
        email: 'test@example.com'
      });
      console.log('Test user created with ID:', userId);
      
      // Verify the user was created
      const createdUser = Accounts.findUserByUsername('test');
      console.log('Created user details:', createdUser);
    } else {
      console.log('Test user already exists:', existingUser);
    }
  } catch (error) {
    console.error('Error in user creation:', error);
  }
});