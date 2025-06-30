import { H2 } from "./H2";
import { List } from "./list";
import { P } from "./P";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { View } from "./view";

export const ProductsSection = () => {
  return (
    <View>
      <H2 className="pl-4">Produkter</H2>
      <Card>
        <CardHeader>
          <Button variant="secondary" size="sm">
            Ny produkt
          </Button>
        </CardHeader>
        <CardContent className="pt-3">
          <List>
            <li>
              <Card className="flex width-full border border-secondary flex-row gap-5 p-3">
                <Avatar className="rounded-sm self-center h-32 w-32">
                  <AvatarImage />
                  <AvatarFallback className="rounded-none bg-secondary" />
                </Avatar>
                <View className="py-2">
                  <h3 className="text-lg">Produkt ett</h3>
                  <P>hdasjdh ahsdkjhas dashjdkhsa dhsajkdhsa dsahjkdhas</P>
                </View>
              </Card>
            </li>
          </List>
        </CardContent>
      </Card>
    </View>
  );
};
