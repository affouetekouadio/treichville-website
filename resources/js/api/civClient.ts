type CivEntity = "Service" | "Actualite" | "Evenement" | "Contact";

type RequestMethod = "GET" | "POST";

interface CivClientOptions {
  apiUrl?: string;
  projectId?: string;
  apiKey?: string;
}

const ENTITY_PATHS: Record<CivEntity, string> = {
  Service: "services",
  Actualite: "actualites",
  Evenement: "evenements",
  Contact: "contacts",
};

class CivClient {
  private apiUrl: string;
  private projectId?: string;
  private apiKey?: string;

  public entities: Record<CivEntity, CivEntityClient>;

  constructor(options: CivClientOptions = {}) {
    this.apiUrl =
      options.apiUrl ??
      import.meta.env.VITE_CIV_API_URL ??
      import.meta.env.VITE_BASE44_API_URL ??
      "/api/civ";

    this.projectId =
      options.projectId ??
      import.meta.env.VITE_CIV_PROJECT_ID ??
      import.meta.env.VITE_BASE44_PROJECT_ID;

    this.apiKey =
      options.apiKey ??
      import.meta.env.VITE_CIV_API_KEY ??
      import.meta.env.VITE_BASE44_API_KEY;

    this.entities = Object.keys(ENTITY_PATHS).reduce((acc, entity) => {
      const key = entity as CivEntity;
      acc[key] = new CivEntityClient(this, key);
      return acc;
    }, {} as Record<CivEntity, CivEntityClient>);
  }

  async request<TResponse>(
    path: string,
    method: RequestMethod,
    body?: Record<string, unknown>
  ): Promise<TResponse> {
    const headers: HeadersInit = { "Content-Type": "application/json" };

    if (this.apiKey) {
      headers.Authorization = `Bearer ${this.apiKey}`;
    }
    if (this.projectId) {
      headers["x-project-id"] = this.projectId;
    }

    const response = await fetch(`${this.apiUrl}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `[CivAPI] ${response.status} ${response.statusText} - ${errorBody || "Unknown error"}`
      );
    }

    if (response.status === 204) {
      return undefined as TResponse;
    }

    return (await response.json()) as TResponse;
  }
}

class CivEntityClient {
  constructor(private client: CivClient, private entity: CivEntity) {}

  private buildPath(query?: URLSearchParams) {
    const basePath = `/entities/${ENTITY_PATHS[this.entity]}`;
    return query ? `${basePath}?${query.toString()}` : basePath;
  }

  async list<T = Record<string, unknown>>(
    orderBy?: string,
    limit?: number
  ): Promise<T[]> {
    const query = new URLSearchParams();
    if (orderBy) query.append("orderBy", orderBy);
    if (typeof limit === "number") query.append("limit", limit.toString());

    return this.client.request<T[]>(this.buildPath(query), "GET");
  }

  async filter<T = Record<string, unknown>>(
    filters: Record<string, unknown> = {},
    orderBy?: string,
    limit?: number
  ): Promise<T[]> {
    return this.client.request<T[]>(`${this.buildPath()}/filter`, "POST", {
      filters,
      orderBy,
      limit,
    });
  }

  async create<
    TResponse = Record<string, unknown>,
    TPayload = Record<string, unknown>
  >(payload: TPayload): Promise<TResponse> {
    return this.client.request<TResponse>(
      this.buildPath(),
      "POST",
      payload as Record<string, unknown>
    );
  }
}

export const civClient = new CivClient();

