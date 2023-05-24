export interface Site {
    /**
     * Unique identifier of a site entity.
     */
    id?: string;
    /**
     * Reference of the site entity.
     */
    href?: string;
    /**
     * Name of the site entity.
     */
    name?: string;
    /**
     * Role played by the site party
     */
    role?: string;
    /**
     * When sub-classing, this defines the super-class
     */
    baseType?: string;
    /**
     * A URI to a JSON-Schema file that defines additional attributes and relationships
     */
    schemaLocation?: string;
    /**
     * When sub-classing, this defines the sub-class entity name
     */
    '@type'?: string;
    /**
     * The actual type of the target instance when needed for disambiguation.
     */
    '@referredType'?: string;

    siteId?: string;
    /**
     * When sub-classing, this defines the sub-class entity name
     */
}
