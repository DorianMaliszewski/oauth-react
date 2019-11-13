echo "Installing dependencies";
sleep 3;
cd auth && ./mvnw clean package -DskipTests;
if [ $? != 0 ] ; then
    echo "An error occured when installing spring boot dependencies";
    exit 1;
fi
cd ../;
cd client && yarn install;
if [ $? != 0 ] ; then
    echo "An error occured when installing react dependencies";
    exit 1;
fi

echo "Dependencies installed";
echo "Building React App with production environment variables...";
sleep 3;
yarn build;

if [ $? != 0 ] ; then
    echo "An error occured when building react app";
    exit 1;
fi

echo "Build succeded";


echo "Creating react docker image..."
sleep 3;

docker build -t react-authorization-server-web .

if [ $? != 0 ] ; then
    echo "An error occured when building the react image";
    exit 1;
fi

echo "Docker react image created";

cd ../;

cd auth/;


echo "Building backend ...";
sleep 3;

./mvnw package docker:build -DskipTests

echo "Backend built...";

cd ../;
echo "Launching docker-compose -d";

sleep 3;

docker-compose up -d;

if [ $? != 0 ] ; then
    echo "An error occured when starting the stack";
    exit 2;
fi

echo "Stack started";
