import { H2 } from "./H2";
import { List } from "./list";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { View } from "./view";

export const ProductsSection = () => {
  return (
    <View>
      <H2>Produkter</H2>
      <Card>
        <CardHeader>
          <Button variant="secondary">Ny produkt</Button>
        </CardHeader>
        <CardContent>
          <List>
            <li>
              <Card className="border">
                <CardHeader>Produkt ett</CardHeader>
                <CardContent>
                  hdasjdh ahsdkjhas dashjdkhsa dhsajkdhsa dsahjkdhas
                </CardContent>
              </Card>
            </li>
          </List>
        </CardContent>
      </Card>
    </View>
  );
};
